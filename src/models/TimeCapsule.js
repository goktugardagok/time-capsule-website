const mongoose = require('mongoose');

const TimeCapsuleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String },
  imageUrl: { type: String },
  videoUrl: { type: String },
  openDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TimeCapsule', TimeCapsuleSchema);
