const TimeCapsule = require('../models/timeCapsuleModel');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

// Create a new connection for GridFS
const conn = mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Initialize GridFS
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create a new time capsule
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
        res.status(201).json({ message: 'Time capsule created successfully', newCapsule });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get countdown to open date
const getCountdown = async (req, res) => {
    try {
        const { id } = req.params;
        const capsule = await TimeCapsule.findById(id);

        if (!capsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const now = new Date();
        const openDate = new Date(capsule.openDate);
        const timeLeft = openDate - now;

        if (timeLeft <= 0) {
            return res.json({ message: 'The time capsule is ready to be opened!' });
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        res.json({ message: `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get time capsule content
const getTimeCapsuleContent = async (req, res) => {
    try {
        const { id } = req.params;
        const capsule = await TimeCapsule.findById(id);

        if (!capsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const now = new Date();
        const openDate = new Date(capsule.openDate);

        if (now < openDate) {
            return res.status(403).json({ message: 'Time capsule is not ready to be opened yet' });
        }

        res.json({
            text: capsule.text,
            imageUrl: capsule.imageUrl,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Serve the image file from GridFS
const getFile = async (req, res) => {
    try {
        const { filename } = req.params;
        const file = await gfs.files.findOne({ filename });

        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTimeCapsule,
    getCountdown,
    getTimeCapsuleContent,
    getFile,
};