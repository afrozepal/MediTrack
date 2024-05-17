// backend/models/ratingSchema.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    week: {
        type: String,
        required: true
    }, // e.g., '2024-20' for the 20th week of 2024
    ratings: {
        type: [Number],
        required: true
    } // Array of 7 ratings
});

module.exports = mongoose.model('Rating', ratingSchema);
