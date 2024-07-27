const mongoose = require('mongoose');

const timeCapsuleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String, required: false },
  openDate: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model('TimeCapsule', timeCapsuleSchema);