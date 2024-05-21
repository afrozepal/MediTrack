const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    entry: { type: String, required: true }
});

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;