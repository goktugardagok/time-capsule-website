const TimeCapsule = require('../models/timeCapsuleModel');

const createTimeCapsule = async (req, res) => {
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
        res.json({ message: 'Time capsule created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCountdown = async (req, res) => {
    try {
        const { id } = req.query;
        const capsule = await TimeCapsule.findById(id);
        if (!capsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }
        const now = new Date();
        const timeLeft = Math.max(0, capsule.openDate - now);
        res.json({ timeLeft });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getContent = async (req, res) => {
    try {
        const { id } = req.query;
        const capsule = await TimeCapsule.findById(id);
        if (!capsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }
        const now = new Date();
        if (now < capsule.openDate) {
            return res.status(403).json({ message: 'Content not available yet' });
        }
        res.json({ text: capsule.text, imageUrl: capsule.imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTimeCapsule,
    getCountdown,
    getContent
};