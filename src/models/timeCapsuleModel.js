const mongoose = require('mongoose');

const timeCapsuleSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    openDate: {
        type: Date,
        required: true
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploads.files'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('TimeCapsule', timeCapsuleSchema);