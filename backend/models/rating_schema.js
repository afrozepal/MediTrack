const mongoose = require('mongoose');

// Define a schema for the ratings data
const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    ratings: {
        type: [Number],
        required: true
    }
});

// Create a model based on the schema
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;