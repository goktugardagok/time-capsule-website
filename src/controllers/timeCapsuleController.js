const TimeCapsule = require('../models/timeCapsuleModel');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

exports.createTimeCapsule = async (req, res) => {
    try {
        const { userId, text, openDate } = req.body;
        const files = req.files.map(file => file.id);
        const newTimeCapsule = new TimeCapsule({ userId, text, openDate, files });
        await newTimeCapsule.save();
        res.status(201).json({ message: 'Time capsule created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCountdown = async (req, res) => {
    try {
        const timeCapsule = await TimeCapsule.findById(req.params.id);
        const now = new Date();
        const openDate = new Date(timeCapsule.openDate);
        const timeLeft = openDate - now;
        res.status(200).json({ timeLeft });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getContent = async (req, res) => {
    try {
        const timeCapsule = await TimeCapsule.findById(req.params.id);
        const now = new Date();
        const openDate = new Date(timeCapsule.openDate);
        if (now >= openDate) {
            res.status(200).json({ text: timeCapsule.text, files: timeCapsule.files });
        } else {
            res.status(403).json({ message: 'Content not available yet' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};