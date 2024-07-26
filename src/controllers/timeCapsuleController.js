const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const TimeCapsule = require('../models/timeCapsuleModel');
const path = require('path');

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const files = req.files;

    let fileData = files.map(file => ({
      filename: file.filename,
      contentType: file.contentType,
      fileId: file.id
    }));

    const newTimeCapsule = new TimeCapsule({
      userId,
      text,
      files: fileData,
      openDate,
      createdAt: new Date()
    });

    await newTimeCapsule.save();
    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating time capsule' });
  }
};

exports.getTimeCapsuleCountdown = async (req, res) => {
  try {
    const { id } = req.params;
    const timeCapsule = await TimeCapsule.findById(id);

    if (!timeCapsule) {
      return res.status(404).json({ message: 'Time capsule not found' });
    }

    const now = new Date();
    const openDate = new Date(timeCapsule.openDate);
    const timeLeft = openDate - now;

    if (timeLeft <= 0) {
      return res.status(200).json({ message: 'Time capsule can be opened now' });
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    res.status(200).json({ message: `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting countdown' });
  }
};

exports.getTimeCapsuleContent = async (req, res) => {
  try {
    const { id } = req.params;
    const timeCapsule = await TimeCapsule.findById(id);

    if (!timeCapsule) {
      return res.status(404).json({ message: 'Time capsule not found' });
    }

    const now = new Date();
    const openDate = new Date(timeCapsule.openDate);
    const timeLeft = openDate - now;

    if (timeLeft > 0) {
      return res.status(403).json({ message: 'Time capsule cannot be opened yet' });
    }

    const fileIds = timeCapsule.files.map(file => file.fileId);

    let filesData = [];
    for (let fileId of fileIds) {
      const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) });
      if (file) {
        filesData.push({
          filename: file.filename,
          contentType: file.contentType,
          fileId: file._id
        });
      }
    }

    res.status(200).json({
      userId: timeCapsule.userId,
      text: timeCapsule.text,
      files: filesData,
      openDate: timeCapsule.openDate,
      createdAt: timeCapsule.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting time capsule content' });
  }
};