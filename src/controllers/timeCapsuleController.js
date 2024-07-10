const TimeCapsule = require('../models/timeCapsuleModel');
const upload = require('../utils/fileStorage').single('file');

exports.createTimeCapsule = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const { userId, text, openDate } = req.body;
        const fileUrl = req.file.filename;

        const newTimeCapsule = new TimeCapsule({
            userId,
            text,
            imageUrl: fileUrl,
            openDate
        });

        try {
            const savedTimeCapsule = await newTimeCapsule.save();
            res.status(201).json(savedTimeCapsule);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};