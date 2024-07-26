const mongoose = require('mongoose');

const timeCapsuleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  openDate: { type: Date, required: true },
  fileUrls: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

const TimeCapsule = mongoose.model('TimeCapsule', timeCapsuleSchema);

module.exports = TimeCapsule;