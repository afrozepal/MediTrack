const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('./mongo');
const jwt = require('jsonwebtoken');
const Therapist = require('../backend/models/therapist');
const client = require('../backend/models/clientrel');
const Question = require('../backend/models/questions')
const User = require('../backend/models/model');
const Rating = require('../backend/models/rating_schema');
const ArticleSchema = require('../backend/models/article_schema')
const nodemailer = require('nodemailer');
const Diary = require('../backend/models/diary_schema');
const { spawn } = require('child_process');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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

const imagePath = 'C:/web-project-monday/my-react-app/src/assets/Mindmate.png';

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: 'Mindmate.png',
                path: imagePath,
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
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Login Route
app.post('/login-here', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;
        if (role === 'client') {
            user = await User.findOne({ email });
        } else if (role === 'therapist') {
            user = await Therapist.findOne({ email });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const username = user.name;
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role, username });
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
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
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
//-------------------------------------------------MY WORK--------------------------------------------------------------

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
        const { newTherapist, existingTherapistPassword } = req.body;
        const existingTherapistId = '664bcdb139f4e0c0f2f48212'; // Assume the therapist is authenticated and their ID is available in req.user.id

        // Find the existing therapist
        const existingTherapist = await Therapist.findById(existingTherapistId);
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
        console.log("HEELLLLLLLLLLLLLLLLLLL000000000000");
        res.status(200).json(therapistsWithClientCount);
    } catch (error) {
        console.error('Error counting clients for therapists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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
        const diaryEntry = await Diary.findOne({ date, userId });
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