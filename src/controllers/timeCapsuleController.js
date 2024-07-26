const TimeCapsule = require('../models/timeCapsuleModel');
const upload = require('../utils/fileStorage');
const fs = require('fs');
const path = require('path');
const { MongoClient, GridFSBucket } = require('mongodb');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

exports.createTimeCapsule = [
    upload.array('files', 12), // Allowing multiple files, up to 12
    async (req, res) => {
        try {
            const { userId, text, openDate } = req.body;
            const files = req.files.map(file => file.filename);

            const newTimeCapsule = new TimeCapsule({
                userId,
                text,
                files,
                openDate
            });

            await newTimeCapsule.save();

            // Move files to GridFS
            req.files.forEach(file => {
                const writestream = gfs.createWriteStream({ filename: file.filename });
                fs.createReadStream(path.join('uploads/', file.filename)).pipe(writestream);
            });

            res.status(201).json({ message: 'Time capsule created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating time capsule', error });
        }
    }
];

exports.getCountdown = async (req, res) => {
    try {
        const { id } = req.params;
        const timeCapsule = await TimeCapsule.findById(id);

        if (!timeCapsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        const timeLeft = new Date(timeCapsule.openDate) - new Date();

        res.json({ timeLeft });
    } catch (error) {
        res.status(500).json({ message: 'Error getting countdown', error });
    }
};

exports.getContent = async (req, res) => {
    try {
        const { id } = req.params;
        const timeCapsule = await TimeCapsule.findById(id);

        if (!timeCapsule) {
            return res.status(404).json({ message: 'Time capsule not found' });
        }

        if (new Date() < new Date(timeCapsule.openDate)) {
            return res.status(403).json({ message: 'Content not available yet' });
        }

        res.json({ text: timeCapsule.text, files: timeCapsule.files });
    } catch (error) {
        res.status(500).json({ message: 'Error getting content', error });
    }
};