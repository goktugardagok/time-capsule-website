const mongoose = require('mongoose');

const timeCapsuleSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    openDate: {
        type: Date,
        required: true,
    },
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
});

const TimeCapsule = mongoose.model('TimeCapsule', timeCapsuleSchema);

module.exports = TimeCapsule;