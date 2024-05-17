const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TherapistSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Make sure passwords are hashed
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }]
});

module.exports = mongoose.model('Therapist', TherapistSchema);
