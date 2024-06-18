const TimeCapsule = require('../models/TimeCapsule');
const { saveFileToCloudStorage } = require('../utils/fileStorage');

exports.createTimeCapsule = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { userId, text, openDate } = req.body;
    const file = req.file;

    // Save file to cloud storage and get the URL
    const mediaUrl = file ? await saveFileToCloudStorage(file) : null;

    const timeCapsule = new TimeCapsule({
      userId,
      text,
      imageUrl: file && file.mimetype.startsWith('image/') ? mediaUrl : undefined,
      videoUrl: file && file.mimetype.startsWith('video/') ? mediaUrl : undefined,
      openDate,
    });

    await timeCapsule.save();
    res.status(201).json(timeCapsule);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTimeCapsules = async (req, res) => {
  try {
    const timeCapsules = await TimeCapsule.find();
    res.status(200).json(timeCapsules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};