const TimeCapsule = require('../models/timeCapsuleModel');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

exports.createTimeCapsule = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        console.log('Received data:', req.body); // Log received data for debugging

        const { userId, text, openDate } = req.body;
        const newCapsule = new TimeCapsule({
            userId,
            text,
            imageUrl: req.file ? req.file.filename : '',
            openDate: new Date(openDate)
        });

        newCapsule.save()
            .then(() => res.status(201).send('Data received successfully'))
            .catch(err => res.status(500).json({ error: err.message }));
    });
};