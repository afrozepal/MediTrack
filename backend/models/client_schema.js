const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Make sure passwords are hashed
    therapist: { type: Schema.Types.ObjectId, ref: 'Therapist' }
});

module.exports = mongoose.model('Client', ClientSchema);
