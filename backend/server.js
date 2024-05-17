const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('./mongo');
const jwt = require('jsonwebtoken');
// const Therapist = require('../models/therapist_schema');
// const Client = require('../models/client_schema');
const User = require('../backend/models/model');
const Rating = require('../backend/models/rating_schema');
const ArticleSchema = require('../backend/models/article_schema')
const nodemailer = require('nodemailer');
const Message = require('../backend/models/texting_schema')
require('dotenv').config();

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



// LOGIN-SIGNUP-FORGOR_PASSWORD FUNCTIONALITY HERE 

app.post("/sig", async (req, res) => {
    try {
        const { username, email, password, action } = req.body;

        if (action === "signup") {
            const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (existingUser) {
                return res.json("exist");
            } else {
                const newUser = new User({ username, email, password });
                await newUser.save();
                sendEmail(email, 'Successful Signup', 'You have successfully signed up!');
                return res.json("success");
            }
        } else if (action === "login") {
            try {
                const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

                if (user && await user.comparePassword(password)) {
                    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                    res.json({ token, username: user.username });
                } else {
                    res.json("notexist");
                }
            } catch (e) {
                res.json("fail");
            }
        } else if (action === "forgotpassword") {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return res.json("notexist");
                }

                user.password = password;
                await user.save();
                sendEmail(email, 'Password Reset Successful', 'Your password has been successfully reset.');
                return res.json("success");
            } catch (error) {
                console.error(error);
                return res.json("fail");
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("fail");
    }
});

// MESSEGE SENDING AND RECEIVING FROM THE THERAPIST 

// Route to fetch messages
app.get('/api/messages', async (req, res) => {
    const { sender, receiver } = req.query;
    try {
        const messages = await Message.find({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/messages', async (req, res) => {
    const { sender, receiver, content } = req.body;
    try {
        const message = new Message({ sender, receiver, content });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/secure-endpoint', authenticateJWT, (req, res) => {
    res.json({ message: `Hello ${req.user.username}` });
});

app.listen(8000, () => {
    console.log("Server listening on port 8000");
});
