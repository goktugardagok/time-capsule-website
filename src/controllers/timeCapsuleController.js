const TimeCapsule = require('../models/timeCapsuleModel');

exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    const files = req.files;

    const fileUrls = files.map(file => {
      return `/api/file/${file.filename}`;
    });

    const timeCapsule = new TimeCapsule({
      userId,
      text,
      openDate,
      fileUrls,
    });

    await timeCapsule.save();

    res.status(201).json({ message: 'Time capsule created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCountdown = async (req, res) => {
  try {
    const { id } = req.params;
    const timeCapsule = await TimeCapsule.findById(id);
    if (!timeCapsule) {
      return res.status(404).json({ message: 'Time capsule not found' });
    }
    res.json({ openDate: timeCapsule.openDate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContent = async (req, res) => {
  try {
    const { id } = req.params;
    const timeCapsule = await TimeCapsule.findById(id);
    if (!timeCapsule) {
      return res.status(404).json({ message: 'Time capsule not found' });
    }

    const now = new Date();
    if (now < new Date(timeCapsule.openDate)) {
      return res.status(403).json({ message: 'Content not available yet' });
    }

    res.json(timeCapsule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};