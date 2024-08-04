const TimeCapsule = require('../models/timeCapsuleModel');

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
        res.status(201).json({ message: 'Time capsule created successfully', newCapsule });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCountdown = async (req, res) => {
    try {
        const { id } = req.query;
        const capsule = await TimeCapsule.findById(id);

        if (!capsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const now = new Date();
        const openDate = new Date(capsule.openDate);
        const timeLeft = openDate - now;

        res.status(200).json({ timeLeft });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getContent = async (req, res) => {
    try {
        const { id } = req.query;
        const capsule = await TimeCapsule.findById(id);

        if (!capsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const now = new Date();
        const openDate = new Date(capsule.openDate);

        if (now < openDate) {
            return res.status(403).json({ message: 'Time capsule cannot be opened yet' });
        }

        res.status(200).json({ content: capsule });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};