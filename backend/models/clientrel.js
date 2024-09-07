const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    therapistId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
});
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;