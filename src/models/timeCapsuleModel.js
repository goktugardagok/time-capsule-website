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
  files: [
    {
      filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }
  ],
  openDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TimeCapsule', timeCapsuleSchema);