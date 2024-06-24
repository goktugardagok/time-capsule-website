const { Storage } = require('@google-cloud/storage');
const TimeCapsule = require('../models/timeCapsuleModel');
const mongoose = require('mongoose');

const gcsKeyJson = JSON.parse(process.env.GCS_KEY_JSON);
const storage = new Storage({ credentials: gcsKeyJson });
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const createTimeCapsule = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on('finish', async () => {
            const timeCapsule = new TimeCapsule({
                userId: req.body.userId,
                text: req.body.text,
                openDate: new Date(req.body.openDate),
                imageUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
            });

            await timeCapsule.save();

            res.status(200).json({ message: 'Time capsule created successfully', timeCapsule });
        });

        blobStream.on('error', (err) => {
            res.status(500).json({ message: 'Failed to upload file to Google Cloud Storage', error: err });
        });

        blobStream.end(req.file.buffer);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create time capsule', error: err });
    }
};

module.exports = { createTimeCapsule };