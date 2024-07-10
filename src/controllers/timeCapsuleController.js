const TimeCapsule = require('../models/timeCapsuleModel');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const Grid = require('gridfs-stream');

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

const createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const imageUrl = `/uploads/${file.filename}`;

    const newTimeCapsule = new TimeCapsule({
      userId,
      text,
      imageUrl,
      openDate
    });

    await newTimeCapsule.save();

    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTimeCapsule,
  upload
};