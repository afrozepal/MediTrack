const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('./mongo');
const User = require('../backend/models/model');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));


app.get('/getByEmail', async (req, res) => {

    const { username } = req.query;

    try {
        const user = await User.findOne({ username });
        res.json({ email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/nav', async (req, res) => {
    console.log("Received POST request to /nav");
    console.log("Request body:", req.body);

    const { usernamee, editedPhone, editedProfession } = req.body;

    try {
        // Find the user by username and update the phone and profession

        const user = await User.findOneAndUpdate(
            { $set: { username: usernamee } },
            { $set: { phone: editedPhone, profession: editedProfession } },
            { new: true } // This option returns the updated user
        );

        res.json(user); // Return the updated user as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.post("/sig", async (req, res) => {
    try {
        const { username, email, password, action } = req.body;

        if (action === "signup") {
            const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (existingUser) {
                return res.json("exist");
            } else {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: password
                });

                await newUser.save();
                return res.json("success");
            }
        } else if (action === "login") {
            try {
                const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

                if (user) {
                    // Compare password using user.password field (ensure you hash passwords before saving)
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
            console.log("hey, I am called2");
        } else {
            return res.json("invalidaction");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("fail");
    }
}
);

// Route for sending reset password link to email
app.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a random token (you can use packages like `crypto` for this)
        const token = generateRandomToken(); // Implement this function

        // Save the token and expiry time to the user document
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expiry time (1 hour in milliseconds)
        await user.save();

        // Send the reset password link to the user's email
        sendResetPasswordEmail(user.email, token); // Implement this function

        res.json({ message: 'Reset password link sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for resetting password with token
app.post('/resetPassword', async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    try {
        // Find user by reset token and check if token is valid
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear the reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});





app.listen(8000, () => {
    console.log("Server listening on port 8000");
});