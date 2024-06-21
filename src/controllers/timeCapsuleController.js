const TimeCapsule = require('../models/timeCapsuleModel');
const upload = require('../utils/fileStorage');

exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    const imageUrl = file ? `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${file.originalname}` : null;

    const newCapsule = new TimeCapsule({
      userId,
      text,
      openDate,
      imageUrl
    });

    await newCapsule.save();
    res.status(201).json(newCapsule);
  } catch (error) {
    console.error('Failed to create time capsule:', error);
    res.status(500).json({ message: 'Failed to create time capsule', error });
  }
};

exports.getAllTimeCapsules = async (req, res) => {
  try {
    const capsules = await TimeCapsule.find();
    res.status(200).json(capsules);
  } catch (error) {
    console.error('Failed to fetch time capsules:', error);
    res.status(500).json({ message: 'Failed to fetch time capsules', error });
  }
};