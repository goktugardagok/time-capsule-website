const TimeCapsule = require('../models/timeCapsuleModel');

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