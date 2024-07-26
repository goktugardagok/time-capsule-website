const TimeCapsule = require('../models/timeCapsuleModel');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const path = require('path');
const fs = require('fs');

const mongoURI = process.env.MONGODB_URI;
const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const createTimeCapsule = async (req, res) => {
  const { userId, text, openDate } = req.body;
  const file = req.file;

  const newTimeCapsule = new TimeCapsule({
    userId,
    text,
    imageUrl: file ? file.filename : null,
    openDate: new Date(openDate),
    createdAt: new Date()
  });

  await newTimeCapsule.save();

  res.json({ message: 'Time capsule created successfully' });
};

const getCountdown = async (req, res) => {
  const { id } = req.params;
  const capsule = await TimeCapsule.findById(id);
  
  if (!capsule) {
    return res.status(404).json({ message: 'Time capsule not found' });
  }

  const now = new Date();
  const timeLeft = capsule.openDate - now;

  if (timeLeft <= 0) {
    return res.json({ message: 'Time capsule is now open' });
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  res.json({ timeLeft: `${days}d ${hours}h ${minutes}m ${seconds}s` });
};

const getContent = async (req, res) => {
  const { id } = req.params;
  const capsule = await TimeCapsule.findById(id);

  if (!capsule) {
    return res.status(404).json({ message: 'Time capsule not found' });
  }

  const now = new Date();
  if (now < capsule.openDate) {
    return res.json({ message: 'Content not available yet' });
  }

  if (capsule.imageUrl) {
    const readstream = gfs.createReadStream({
      filename: capsule.imageUrl,
      root: 'uploads'
    });

    readstream.on('error', (err) => {
      res.status(500).json({ message: 'An error occurred while retrieving the file' });
    });

    readstream.pipe(res);
  } else {
    res.json({ text: capsule.text });
  }
};

module.exports = {
  createTimeCapsule,
  getCountdown,
  getContent
};