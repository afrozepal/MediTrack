const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    ref: 'Doctor',
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
