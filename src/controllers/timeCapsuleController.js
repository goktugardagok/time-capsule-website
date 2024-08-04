const TimeCapsule = require('../models/timeCapsuleModel');
const { sendNotification } = require('../utils/notifications');

exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    const newCapsule = new TimeCapsule({
      userId,
      text,
      imageUrl: file ? file.path : null,
      openDate,
      createdAt: new Date(),
    });

    await newCapsule.save();
    sendNotification(userId, 'Your time capsule has been created!');
    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCountdown = async (req, res) => {
  try {
    const { id } = req.query;
    const capsule = await TimeCapsule.findById(id);
    if (!capsule) {
      return res.status(404).json({ error: 'Time capsule not found' });
    }

    const timeLeft = capsule.openDate - new Date();
    res.json({ timeLeft });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContent = async (req, res) => {
  try {
    const { id } = req.query;
    const capsule = await TimeCapsule.findById(id);
    if (!capsule) {
      return res.status(404).json({ error: 'Time capsule not found' });
    }

    if (new Date() < capsule.openDate) {
      return res.status(403).json({ error: 'Content not available yet' });
    }

    res.json({ text: capsule.text, imageUrl: capsule.imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};