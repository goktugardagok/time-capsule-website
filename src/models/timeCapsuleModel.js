const TimeCapsule = require('../models/timeCapsuleModel');

const createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    const newTimeCapsule = new TimeCapsule({
      userId,
      text,
      openDate,
      fileId: file.id, // GridFS file ID
      fileName: file.filename // Original filename
    });

    await newTimeCapsule.save();
    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createTimeCapsule };