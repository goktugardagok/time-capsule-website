const TimeCapsule = require('../models/timeCapsuleModel');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const mongoURI = process.env.MONGODB_URI;
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

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
        res.status(201).json({ message: 'Time capsule created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTimeCapsule = async (req, res) => {
    try {
        const { id } = req.params;
        const timeCapsule = await TimeCapsule.findById(id);

        if (!timeCapsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const currentTime = new Date();
        const openDate = new Date(timeCapsule.openDate);

        if (currentTime < openDate) {
            return res.status(403).json({ message: 'Content not available yet' });
        }

        res.status(200).json(timeCapsule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCountdown = async (req, res) => {
    try {
        const { id } = req.params;
        const timeCapsule = await TimeCapsule.findById(id);

        if (!timeCapsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const currentTime = new Date();
        const openDate = new Date(timeCapsule.openDate);
        const timeLeft = openDate - currentTime;

        if (timeLeft <= 0) {
            return res.status(200).json({ message: 'Time capsule is open' });
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        res.status(200).json({ message: `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTimeCapsule, getTimeCapsule, getCountdown };