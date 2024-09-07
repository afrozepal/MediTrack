const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('./mongo');
const jwt = require('jsonwebtoken');
const Therapist = require('../backend/models/therapist');
const Admin = require('../backend/models/admin'); 
const client = require('../backend/models/clientrel');
const Question = require('../backend/models/questions')
const User = require('../backend/models/model');
const Rating = require('../backend/models/rating_schema');
const ArticleSchema = require('../backend/models/article_schema')
const nodemailer = require('nodemailer');
const Diary = require('../backend/models/diary_schema');
const Appointment =require('../backend/models/Appointment');
const { spawn } = require('child_process');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { onHomeworkAssigned } = require('./Websocketserver');
// import {imgpath} from '../src/assets/Mindmate.png';
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// EMAIL - GMAIL INTEGRATION FUNCTIONALITY 

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: 'Mindmate.png',
                path: './Mindmate.png',
                cid: 'unique@mindmate.cid'
            }
        ],
        html: `<p>${text}</p><img src="cid:unique@mindmate.cid" alt="Mindmate Image"/>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


app.post('/ratings', authenticateJWT, async (req, res) => {
    try {
        const { week, ratings } = req.body;
        const userId = req.user.userId;
        const existingRating = await Rating.findOne({ userId, week });

        if (existingRating) {
            existingRating.ratings = ratings;
            await existingRating.save();
            res.status(200).json(existingRating);
        } else {
            const newRating = new Rating({ userId, week, ratings });
            const savedRating = await newRating.save();
            res.status(201).json(savedRating);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/ratings', authenticateJWT, async (req, res) => {
    try {
        const { week } = req.query;
        const userId = req.user.userId;
        const rating = await Rating.findOne({ userId, week });

        if (!rating) {
            return res.status(404).json({ error: 'No ratings found for the specified week' });
        }

        res.json(rating);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ARTICLES FOR PROFILE(ARTICLE) PAGE HERE 

// Route to get a single article by ID
app.get('/getarticle/:id', async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await ArticleSchema.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all articles
app.get('/getarticles', async (req, res) => {
    try {
        const articles = await ArticleSchema.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// SIGNUP - LOGIN IS HEREEEEEEEEEEEEEEEE
// Signup Route
// app.post('/signup-here', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         let user;
//         if (role === 'client') {
//             user = new User({ name, email, password });
//         } else if (role === 'therapist') {
//             user = new Therapist({ name, email, password });
//         } else {
//             return res.status(400).json({ message: 'Invalid role' });
//         }
//         await user.save();
//         res.status(201).json({ message: 'User created successfully', role });
//         sendEmail(email, 'Successful Signup', 'You have successfully signed up!');
//     } catch (error) {
//         console.error('Error creating user', error);
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// });

app.post('/signup-here', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user;
        if (role === 'client') {
            user = new User({ name, email, password });
        } else if (role === 'therapist') {
            user = new Therapist({ name, email, password });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }
        await user.save();
        res.status(201).json({ message: 'User created successfully', role });
        sendEmail(email, 'Successful Signup', 'You have successfully signed up!');
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});


// Login Route
// app.post('/login-here', async (req, res) => {
//     const { email, password, role } = req.body;

//     try {
//         let user;
//         if (role === 'client') {
//             user = await User.findOne({ email });
//         } else if (role === 'therapist') {
//             user = await Therapist.findOne({ email });
//         } else {
//             return res.status(400).json({ message: 'Invalid role' });
//         }

//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const username = user.name;
//         const useremail = user.email;
//         const userpass = user.password;
//         const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, role, username, useremail, userpass });
//     } catch (error) {
//         console.error('Error logging in', error);
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// });

app.post('/login-here', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;

        // Check for different roles
        if (role === 'client') {
            user = await User.findOne({ email });
        } else if (role === 'therapist') {
            user = await Therapist.findOne({ email });
        } else if (role === 'admin') {
            user = await Admin.findOne({ email });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if user exists and password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if admin login and the user is actually an admin
        if (role === 'admin' && !user.isAdminUser()) {
            return res.status(403).json({ message: 'Not authorized as admin' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send user information and token in response
        res.json({
            token,
            role,
            username: user.name,
            useremail: user.email,
            userpass: user.password
        });

    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});



// Forgot Password
app.post('/forgot-password', async (req, res) => {
    const { email, newPassword, role } = req.body;
    try {
        let user;
        if (role === 'client') {
            user = await User.findOne({ email });
        } else if (role === 'therapist') {
            user = await Therapist.findOne({ email });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        sendEmail(email, 'Password Reset Succesfull', 'You have successfully changes your passowrd.');
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
});

// delete account functionality 
app.delete('/delete-account', async (req, res) => {
    // Authentication
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        // Delete user account
        const userId = req.user._id;
        await User.findByIdAndDelete(userId);
        res.status(200).send({ message: 'Account successfully deleted.' });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(400).send('Invalid token.');
        } else {
            res.status(500).send({ message: 'Error deleting account.', error });
        }
    }
});


app.delete('/delete-account', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        const userId = req.user._id;
        console.log('Deleting user with ID:', userId); // Debugging

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        console.log('User deleted:', user); // Debugging
        res.status(200).send({ message: 'Account successfully deleted.' });
    } catch (error) {
        console.error('Error deleting account:', error); // Debugging
        if (error.name === 'JsonWebTokenError') {
            res.status(400).send('Invalid token.');
        } else {
            res.status(500).send({ message: 'Error deleting account.', error });
        }
    }
});

app.get('/getemail/:id', async (req, res) => {

    // Find user by ID
    const  user = await User.findById(req.userId);

    if (user) {
        res.json({ email: user.email });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/userprofile', async (req, res) => {
    try {
        let user;
        if (req.role === 'client') {
            user = await User.findById(req.userId);
        } else if (req.role === 'therapist') {
            user = await Therapist.findById(req.userId);
        }

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ name: user.name, email: user.email });
    } catch (error) {
        res.status(500).send({ error: 'Error fetching user profile' });
    }
});



app.get('/secure-endpoint', authenticateJWT, (req, res) => {
    res.json({ message: `Hello ${req.user.username}` });
});

app.listen(8000, () => {
    console.log("Server listening on port 8000");
});

// THEREPIST SIDE WORKING - UMAIMA 
//-------------------------------------------------UMAIMA WORK--------------------------------------------------------------

// app.delete('/deleteanswers', async (req, res) => {
//     try {
//         const { answerIds } = req.body; // Assuming answer IDs are sent in the request body
//         const result = await Question.deleteMany({ answerIds })
//         console.log("DELETEDDDDDDDDDDDDDDDDDDDD"); 
//         console.log(answerIds); 
//         res.status(200).json({ message: 'Answers deleted successfully', deletedCount: result.deletedCount });
//     } catch (error) {
//         console.error('Error deleting answers:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.delete('/deleteanswers', async (req, res) => {
    try {
        const { answerIds } = req.body; // Assuming userId is sent in the request body

        // Assuming you have a `Question` model with a `userId` field
        const result = await Question.deleteMany({ userId: answerIds });

        console.log("DELETED QUESTIONS FOR USER:", answerIds);
        res.status(200).json({ message: 'Questions deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting questions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/getclients', async (req, res) => {
    try {
        const therapistId1 = req.query.therapistId;
        console.log("therapistId:", therapistId1);

        // Find all clients associated with the therapistId
        const clients = await client.find({ therapistId: therapistId1 });
        console.log("clients:", clients);

        // Fetch user data for each client
        const clientDataPromises = clients.map(async (client) => {
            const user = await User.findById(client.userId);
            return {
                ...client.toObject(),
                user
            };
        });

        const clientsWithUserData = await Promise.all(clientDataPromises);
        console.log("clientsWithUserData:", clientsWithUserData);
        res.json(clientsWithUserData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/gettherapists', async (req, res) => {
    try {
        // Fetch all therapists
        const therapists = await Therapist.find(); // Replace with your actual model
        
        res.json(therapists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.post('/addclient', async (req, res) => {
    try {
        // Extract therapistId and userId from the request body
        const { therapistId, userId } = req.body;

        // Create a new client document
        const newClient = new client({
            therapistId: therapistId,
            userId: userId
        });

        // Save the new client document to the database
        await newClient.save();

        // Return a success response
        res.status(201).json({ message: 'Client added successfully', client: newClient });
    } catch (error) {
        console.error('Error adding client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// app.post('/addquestions', async (req, res) => {
//     try {
//         const { therapistId, userId, questions } = req.body;

//         // Validate questions array
//         if (!Array.isArray(questions)) {
//             return res.status(400).json({ message: 'Invalid questions format' });
//         }

//         // Save each question to the database with the userId
//         const savedQuestions = await Promise.all(questions.map(async (questionData) => {
//             const question = new Question({ ...questionData, userId, therapistId });
//             return await question.save();
//         }));

//         res.status(201).json(savedQuestions);
//     } catch (error) {
//         console.error('Error adding questions:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


app.post('/addquestions', async (req, res) => {
    try {
        const { therapistId, userId, questions } = req.body;

        // Validate questions array
        if (!Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid questions format' });
        }

        // Save each question to the database with the userId
        const savedQuestions = await Promise.all(questions.map(async (questionData) => {
            const question = new Question({ ...questionData, userId, therapistId });
            return await question.save();
        }));

        // Notify the client (user) that new homework has been assigned
        onHomeworkAssigned(userId, { therapistId, questions });
        res.status(201).json(savedQuestions);

    } catch (error) {
        console.error('Error adding questions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/updateanswers', async (req, res) => {
    const answers = req.body.answers;
    try {
        // Loop through each answer and update the corresponding question
        answers.forEach(async (answer) => {
            const questionId = answer.questionId;
            const answerText = answer.answer;
            // Find the question by ID and update its answer
            const question = await Question.findById(questionId);
            console.log(answerText);
            if (question) {
                question.answer = answerText;
                await question.save();
            } else {
                console.error('Question not found with ID ${ questionId }');
            }
        });
        console.log(answers);
        res.status(200).send({ message: 'Answers updated successfully' });
    } catch (error) {
        console.error('Error updating answers:', error);
        res.status(500).send({ message: 'Error updating answers' });
    }
});


app.get('/getquestions', async (req, res) => {
    try {
        const userId = req.query.userId;

        // Find all questions associated with the userId
        const questions = await Question.find({ userId });

        res.json(questions);
    } catch (error) {
        console.error('Error getting questions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/getusers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error getting questions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/addclients', async (req, res) => {
    try {
        const { therapistId, userId } = req.body;
        const Client = new client({ therapistId, userId });
        await Client.save();
        res.status(201).send({ message: 'Client added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


app.get('/getanswers/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const questions = await Question.find({ userId });

        // Separate questions and answers
        const response = questions.map(question => ({
            questionText: question.text,
            answerText: question.answer,
        }));

        res.status(200).json({ userId, questions: response });
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/addtherapist', async (req, res) => {
    try {
        const { newTherapist, existingTherapistPassword, therapistid } = req.body;

        // Find the existing therapist
        const existingTherapist = await Therapist.findById(therapistid);
        if (!existingTherapist) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the existing therapist's password
        const isMatch = await bcrypt.compare(existingTherapistPassword, existingTherapist.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Hash the new therapist's password
        const hashedPassword = await bcrypt.hash(newTherapist.password, 10);

        // Create the new therapist
        const therapist = new Therapist({
            email: newTherapist.email,
            name: newTherapist.username,
            password: hashedPassword
        });
        await therapist.save();

        res.status(201).json({ message: 'New therapist added successfully' });
    } catch (error) {
        console.error('Error adding therapist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Define the routes for fetching therapist IDs and therapist details with client count
app.get('/therapistIds', async (req, res) => {
    try {
        const therapistIds = await client.distinct('therapistId');
        res.status(200).json(therapistIds);
        console.log("HEELLLLLLLLLLLLLLLLLLL00000000000011111111111");
    } catch (error) {
        console.error('Error fetching therapist IDs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    console.log("HEELLLLLLL----TRYYYY----000011111111111");
});


app.get('/therapistswithclientcount', async (req, res) => {
    try {
        const therapistIds = await client.distinct('therapistId');
        const therapistsWithClientCount = await Promise.all(therapistIds.map(async (therapistId) => {
            const clientCount = await client.countDocuments({ therapistId });
            const therapist = await Therapist.findById(therapistId);
            return { _id: therapistId, name: therapist.name, email: therapist.email, clientCount };
        }));
        res.status(200).json(therapistsWithClientCount);
    } catch (error) {
        console.error('Error counting clients for therapists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//-------------------------------------------------SIDRA COOKIES AND SESSIONS-----------------------------------------------

app.get('/api/user/:id', (req, res) => {
    const userId = req.params._id;
    const user = User.find(user => user._id === parseInt(userId));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.use(cookieParser());
app.get('/', (req, res) => {
    res.cookie('Cookie_token_name', 'encoding cookie strong value', {
        maxAge: 5000,
        expires: new Date(),
        secure: true,
        httpOnly: true,
        sameSite: 'Lax'
    });
    res.send('Welcome to simple HTTP cookie and cookie send successfully');
    console.log(req.cookies);
});
app.get('/deleteCookie', (req, res) => {
    res.clearCookie();
    res.send("cookies has been deleted successfully");
});


// Session
app.use(session({
    secret: "123",
    resave: true,
    saveUninitialized: true,
}));
app.get("/login", function (req, res) {
    req.session.name = "WEB 6-B"
    return res.send("Session Set")
})
app.get("/session", function (req, res) {
    var sessionName = req.session.name;
    console.log(req.session);
    return res.send(sessionName)
})


// DIARY FUNCTIONALITY 
app.post("/diary", async (req, res) => {
    try {
        const { userId, date, entry } = req.body;
        if (!userId || !date || !entry) {
            return res.status(400).json({ error: 'Please provide all required fields' });

        }
        const existingEntry = await Diary.findOne({ userId, date: new Date(date) });
        if (existingEntry) {
            existingEntry.entry = entry;
            await existingEntry.save();
            res.json(existingEntry);
        } else {
            const newDiaryEntry = new Diary({ userId, date: new Date(date), entry });
            await newDiaryEntry.save();
            res.json(newDiaryEntry);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/fetchdiary', async (req, res) => {
    const { date, userId } = req.query;
    try {
        const diaryEntry = await Diary.findOne({ $cast: { date: 'date', userId: 'string' } });
        if (diaryEntry) {
            res.json({ entry: diaryEntry.entry });
        } else {
            res.json({ entry: '' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch diary entry' });
    }
});

const sendEmailonAP = async (to, subject, user, doctor, slot, description) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: description,
        html: `
        <html>
        <body>
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <h1 style="color: #6a1b9a;">Appointment Booking Confirmation</h1>
                <p>Dear ${user.name},</p>
                <p>We are pleased to confirm your appointment with Dr. ${doctor.name}. Here are the details of your appointment:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Slot:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${slot}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Doctor:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">Dr. ${doctor.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Specialization:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${doctor.specialization}</td>
                    </tr>
                </table>
                <p>If you need to reschedule or have any questions, please contact us at [Clinic's Phone Number] or [Clinic's Email Address].</p>
                <p>We look forward to seeing you.</p>
                <p>Best regards,</p>
                <p>The Team</p>
                <p style="color: #777; font-size: 12px;">H-23 block undefined , city xyz</p>
                <img src="cid:unique@mindmate.cid" alt="Mindmate Image" style="max-width: 100%; height: auto; margin-top: 20px;" />
            </div>
        </body>
        </html>
        `,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
app.post('/appointments', async (req, res) => {
    try {
        const { doctorId, userId, slot, description } = req.body;

        // Fetch user and doctor information
        const user = await User.findById(userId);
        const doctor = await Therapist.findById(doctorId); // Assuming you have a Doctor model
        const email = user.email;

        const appointment = new Appointment({
            doctorId: doctorId,
            userId: userId,
            slot,
            description,
        });

        console.log("Creating appointment:", appointment);
        await appointment.save();

        // Send email with appointment details
        await sendEmailonAP(email, 'Successful Booking', user, doctor, slot, description);

        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Failed to book the appointment.' });
    }
});

app.get('/appointmentshistory', async (req, res) => {
    try {
        // Fetch all appointments
        const appointments = await Appointment.find()
            .sort({ createdAt: -1 }); // Optional: Sort by most recent appointments

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found.' });
        }

        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointment history:', error);
        res.status(500).json({ message: 'Error fetching appointment history' });
    }
});



app.put('/changeslot/:appointmentId', async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { slot } = req.body;

        // Update the appointment slot
        const appointment = await appointment.findByIdAndUpdate(
            appointmentId,
            { slot },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json({ message: 'Slot updated successfully', appointment });
    } catch (error) {
        console.error('Error changing slot:', error);
        res.status(500).json({ message: 'Error changing slot' });
    }
});
