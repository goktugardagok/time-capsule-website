const TimeCapsule = require('../models/timeCapsuleModel');
const { upload, uploadFile } = require('../utils/fileStorage');

exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadFile(file);
    }

    const newCapsule = new TimeCapsule({
      userId,
      text,
      openDate,
      imageUrl,
    });

    await newCapsule.save();
    res.status(201).json(newCapsule);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create time capsule', error });
  }
};

exports.getAllTimeCapsules = async (req, res) => {
  try {
    const capsules = await TimeCapsule.find();
    res.status(200).json(capsules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch time capsules', error });
  }
};