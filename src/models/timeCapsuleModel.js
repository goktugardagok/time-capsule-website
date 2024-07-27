const mongoose = require('mongoose');

const timeCapsuleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String },
    imageUrl: { type: String }, // Not required
    openDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

const TimeCapsule = mongoose.model('TimeCapsule', timeCapsuleSchema);

module.exports = TimeCapsule;