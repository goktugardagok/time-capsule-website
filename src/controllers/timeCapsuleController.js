const TimeCapsule = require('../models/timeCapsuleModel');
const upload = require('../utils/fileStorage');

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