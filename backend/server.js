// const express = require("express");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const mongoose = require('./mongo');
// const User = require('../backend/models/model');
// const ArticleSchema = require('../backend/models/article_schema');
// const Rating = require('../backend/models/rating_schema');
// const nodemailer = require('nodemailer');
// const img1 = require('../src/assets/6.jpg');

// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors({ origin: true, credentials: true }));

// // Debug: Check if environment variables are loaded
// console.log('EMAIL_USER:', process.env.EMAIL_USER);
// console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

// // Configure Nodemailer with Gmail SMTP
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// // Function to send email
// const sendEmail = async (to, subject, text) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER, // sender address
//         to: to, // list of receivers
//         subject: subject, // Subject line
//         text: text // plain text body
//     };

//     try {
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// // Storing ratings in database
// app.post('/ratings', async (req, res) => {
//     try {
//         const { userId, ratings } = req.body;
//         const newRating = new Rating({ userId, ratings });
//         const savedRating = await newRating.save();
//         res.status(201).json(savedRating);
//     } catch (error) {
//         console.error('Error saving rating:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Fetch articles
// app.get('/getarticles', (req, res) => {
//     ArticleSchema.find()
//         .then(ArticleSchema => res.json(ArticleSchema))
//         .catch(err => res.json(err));
// });

// // Login-Signup-Forgot Password functionalities
// app.post("/sig", async (req, res) => {
//     try {
//         const { username, email, password, action } = req.body;

//         if (action === "signup") {
//             const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

//             if (existingUser) {
//                 return res.json("exist");
//             } else {
//                 const newUser = new User({ username, email, password });
//                 await newUser.save();

//                 // Send sign-up success email
//                 sendEmail(email, 'Successful Signup', 'You have successfully signed up!');

//                 return res.json("success");
//             }
//         } else if (action === "login") {
//             try {
//                 const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

//                 if (user) {
//                     if (user.password === password) {
//                         res.json("exist");
//                     } else {
//                         res.json("invalid");
//                     }
//                 } else {
//                     res.json("notexist");
//                 }
//             } catch (e) {
//                 res.json("fail");
//             }
//         } else if (action === "forgotpassword") {
//             try {
//                 const user = await User.findOne({ email });

//                 if (!user) {
//                     return res.json("notexist");
//                 }

//                 user.password = password;
//                 await user.save();

//                 // Send forgot password success email
//                 sendEmail(email, 'Password Reset Successful', 'Your password has been successfully reset.');
//                 // sendEmail(email, 'Password Reset Successful', img1);

//                 return res.json("success");
//             } catch (error) {
//                 console.error(error);
//                 return res.json("fail");
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json("fail");
//     }
// });

// app.listen(8000, () => {
//     console.log("Server listening on port 8000");
// });



const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('./mongo');
const User = require('../backend/models/model');
const ArticleSchema = require('../backend/models/article_schema');
const Rating = require('../backend/models/rating_schema');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email with an image attachment
const sendEmail = async (to, subject, text, imagePath) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        attachments: [
            {
                filename: 'image.jpg',
                path: imagePath,
                cid: 'unique@image.cid' // same cid value as in the html img src
            }
        ],
        html: `<p>${text}</p><img src="cid:unique@image.cid"/>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Example usage
sendEmail('recipient@example.com', 'Subject', 'Email body text', 'path/to/image.jpg');

app.post('/ratings', async (req, res) => {
    try {
        const { userId, ratings } = req.body;
        const newRating = new Rating({ userId, ratings });
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (error) {
        console.error('Error saving rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getarticles', (req, res) => {
    ArticleSchema.find()
        .then(ArticleSchema => res.json(ArticleSchema))
        .catch(err => res.json(err));
});

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

                // Send sign-up success email with an image
                sendEmail(email, 'Successful Signup', 'You have successfully signed up!', 'path/to/signup-success.jpg');

                return res.json("success");
            }
        } else if (action === "login") {
            try {
                const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

                if (user) {
                    if (user.password === password) {
                        res.json("exist");
                    } else {
                        res.json("invalid");
                    }
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

                // Send forgot password success email with an image
                sendEmail(email, 'Password Reset Successful', 'Your password has been successfully reset.', 'path/to/reset-success.jpg');

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

app.listen(8000, () => {
    console.log("Server listening on port 8000");
});
