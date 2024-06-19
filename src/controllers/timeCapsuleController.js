const TimeCapsule = require('../models/TimeCapsule'); // Ensure this path is correct
const path = require('path');
const fs = require('fs');
const { uploadFile } = require('../utils/fileStorage'); // Assuming you have a fileStorage utility

// Controller to get all time capsules
exports.getAllTimeCapsules = async (req, res) => {
  try {
    const timeCapsules = await TimeCapsule.find();
    res.status(200).json(timeCapsules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to create a new time capsule
exports.createTimeCapsule = async (req, res) => {
  try {
    const { userId, text, openDate } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await uploadFile(req.file); // Ensure your uploadFile function handles the file upload correctly
      imageUrl = result.Location;
    }

    const newTimeCapsule = new TimeCapsule({
      userId,
      text,
      openDate,
      imageUrl
    });

    await newTimeCapsule.save();
    res.status(201).json(newTimeCapsule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};