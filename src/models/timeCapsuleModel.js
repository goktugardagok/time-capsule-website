const mongoose = require('mongoose');

const timeCapsuleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String },
    openDate: { type: Date, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

const TimeCapsule = mongoose.model('TimeCapsule', timeCapsuleSchema);

module.exports = TimeCapsule;