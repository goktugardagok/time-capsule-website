const TimeCapsule = require('../models/timeCapsuleModel');
const path = require('path');

exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const file = req.file ? req.file.path : null;
    
    const newCapsule = new TimeCapsule({
      userId,
      text,
      imageUrl: file,
      openDate,
      createdAt: new Date(),
    });

    await newCapsule.save();
    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating time capsule' });
  }
};

exports.getCountdown = async (req, res) => {
  try {
    const capsule = await TimeCapsule.findById(req.params.id);
    if (!capsule) return res.status(404).json({ message: 'Time capsule not found' });

    const currentTime = new Date();
    const openTime = new Date(capsule.openDate);
    const timeDiff = openTime - currentTime;

    if (timeDiff <= 0) {
      res.json({ message: 'The time capsule is available to open!' });
    } else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      res.json({ message: `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching countdown' });
  }
};

exports.getContent = async (req, res) => {
  try {
    const capsule = await TimeCapsule.findById(req.params.id);
    if (!capsule) return res.status(404).json({ message: 'Time capsule not found' });

    const currentTime = new Date();
    const openTime = new Date(capsule.openDate);
    const timeDiff = openTime - currentTime;

    if (timeDiff <= 0) {
      res.json({
        userId: capsule.userId,
        text: capsule.text,
        imageUrl: capsule.imageUrl,
        createdAt: capsule.createdAt,
      });
    } else {
      res.json({ message: 'Content not available yet' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching content' });
  }
};