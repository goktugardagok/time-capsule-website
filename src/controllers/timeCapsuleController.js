const TimeCapsule = require('../models/timeCapsuleModel');

const createTimeCapsule = async (req, res) => {
    try {
        const { userId, text, openDate } = req.body;
        const imageUrl = `/uploads/${req.file.filename}`;

        const newTimeCapsule = new TimeCapsule({
            userId,
            text,
            imageUrl,
            openDate,
            createdAt: new Date()
        });

        await newTimeCapsule.save();
        res.status(201).json({ message: 'Time capsule created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTimeCapsule = async (req, res) => {
    try {
        const { id } = req.params;
        const timeCapsule = await TimeCapsule.findById(id);

        if (!timeCapsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        res.status(200).json(timeCapsule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCountdown = async (req, res) => {
    try {
        const { id } = req.params;
        const timeCapsule = await TimeCapsule.findById(id);

        if (!timeCapsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const now = new Date();
        const openDate = new Date(timeCapsule.openDate);
        const countdown = openDate - now;

        if (countdown <= 0) {
            res.status(200).json({ message: 'The time capsule can be opened now!' });
        } else {
            const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
            const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
            res.status(200).json({ message: `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s` });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTimeCapsule, getTimeCapsule, getCountdown };