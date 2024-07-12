const TimeCapsule = require('../models/timeCapsuleModel');
const { storage } = require('../utils/fileStorage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');

let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create time capsule
exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = file.filename;
    const filePath = `/uploads/${fileName}`;

    const timeCapsule = new TimeCapsule({
      userId,
      text,
      imageUrl: filePath,
      openDate
    });

    await timeCapsule.save();

    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get countdown data
exports.getCountdown = async (req, res) => {
  try {
    const timeCapsule = await TimeCapsule.findById(req.params.id);
    if (!timeCapsule) {
      return res.status(404).json({ message: 'Time capsule not found' });
    }
    res.json({ openDate: timeCapsule.openDate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get time capsule content
exports.getContent = async (req, res) => {
  try {
    const timeCapsule = await TimeCapsule.findById(req.params.id);
    if (!timeCapsule) {
      return res.status(404).json({ message: 'Time capsule not found' });
    }

    const now = new Date();
    const openDate = new Date(timeCapsule.openDate);

    if (now >= openDate) {
      res.json({
        userId: timeCapsule.userId,
        text: timeCapsule.text,
        imageUrl: timeCapsule.imageUrl
      });
    } else {
      res.status(403).json({ message: 'Content not available yet' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};