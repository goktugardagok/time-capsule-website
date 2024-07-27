const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const path = require('path');
const TimeCapsule = require('../models/timeCapsuleModel');

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

const conn = mongoose.createConnection(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const createTimeCapsule = (req, res) => {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    // Save time capsule data to MongoDB
    const timeCapsule = new TimeCapsule({
        userId,
        text,
        imageUrl: file ? `/uploads/${file.filename}` : '',
        openDate,
    });

    timeCapsule.save()
        .then(() => res.status(201).json({ message: 'Time capsule created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

const getTimeCapsule = (req, res) => {
    const { id } = req.params;

    TimeCapsule.findById(id)
        .then(timeCapsule => {
            if (!timeCapsule) {
                return res.status(404).json({ error: 'Time capsule not found' });
            }

            const currentDate = new Date();
            const openDate = new Date(timeCapsule.openDate);

            if (currentDate >= openDate) {
                res.status(200).json(timeCapsule);
            } else {
                const timeLeft = openDate - currentDate;
                res.status(200).json({ message: `Time left: ${timeLeft}` });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

const getCountdown = (req, res) => {
    const { id } = req.params;

    TimeCapsule.findById(id)
        .then(timeCapsule => {
            if (!timeCapsule) {
                return res.status(404).json({ error: 'Time capsule not found' });
            }

            const currentDate = new Date();
            const openDate = new Date(timeCapsule.openDate);

            const timeLeft = openDate - currentDate;
            res.status(200).json({ message: `Time left: ${timeLeft}` });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = {
    createTimeCapsule,
    getTimeCapsule,
    getCountdown,
};