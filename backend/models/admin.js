const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true // Ensure the default is set for admins
    }
});

// Hash the password before saving the admin document
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare the entered password with the stored hashed password
adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Method to check if the user is an admin
adminSchema.methods.isAdminUser = function () {
    return this.isAdmin;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
