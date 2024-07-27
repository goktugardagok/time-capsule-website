const mongoose = require('mongoose');
const TimeCapsule = require('../models/timeCapsuleModel');
const Grid = require('gridfs-stream');
const mongoUri = process.env.MONGO_URI;

const conn = mongoose.createConnection(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

exports.createTimeCapsule = (req, res) => {
    const { userId, text, openDate } = req.body;
    const file = req.file;

    const newTimeCapsule = new TimeCapsule({
        userId,
        text,
        imageUrl: file ? `/file/${file.filename}` : null,
        openDate: new Date(openDate),
        createdAt: new Date()
    });

    newTimeCapsule.save()
        .then(timeCapsule => res.json({ message: 'Time capsule created successfully', timeCapsule }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getCountdown = (req, res) => {
    const { id } = req.params;

    TimeCapsule.findById(id)
        .then(timeCapsule => {
            if (!timeCapsule) {
                return res.status(404).json({ error: 'Time capsule not found' });
            }

            const now = new Date();
            const openDate = new Date(timeCapsule.openDate);
            const timeLeft = openDate - now;

            if (timeLeft <= 0) {
                return res.json({ message: 'Time capsule is ready to be opened' });
            }

            const seconds = Math.floor((timeLeft / 1000) % 60);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

            res.json({ days, hours, minutes, seconds });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getContent = (req, res) => {
    const { id } = req.params;

    TimeCapsule.findById(id)
        .then(timeCapsule => {
            if (!timeCapsule) {
                return res.status(404).json({ error: 'Time capsule not found' });
            }

            const now = new Date();
            const openDate = new Date(timeCapsule.openDate);

            if (now < openDate) {
                return res.json({ message: 'Time capsule is not ready to be opened yet' });
            }

            res.json({ timeCapsule });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};