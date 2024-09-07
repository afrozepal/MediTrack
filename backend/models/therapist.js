const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const therapistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

therapistSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

therapistSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const Therapist = mongoose.model('Therapist', therapistSchema);
module.exports = Therapist;

