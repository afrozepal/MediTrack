const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['scale', 'yes-no', 'open-ended'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'therapists',
    required: true
  },
  answer:{
    type: mongoose.Schema.Types.Mixed,
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
