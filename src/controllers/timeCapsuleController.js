const { bucket } = require('../app');
const mongoose = require('mongoose');
const TimeCapsule = require('../models/timeCapsuleModel'); // Ensure the correct path to your model

const createTimeCapsule = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on('finish', async () => {
            console.log('File upload finished');

            const timeCapsule = new TimeCapsule({
                userId: req.body.userId,
                text: req.body.text,
                openDate: req.body.openDate,
                imageUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
            });

            await timeCapsule.save();

            res.status(200).json({ message: 'Time capsule created successfully', timeCapsule });
        });

        blobStream.on('error', (err) => {
            console.error('Blob stream error:', err);
            res.status(500).json({ message: 'Failed to upload file to Google Cloud Storage', error: err });
        });

        blobStream.end(req.file.buffer);
    } catch (err) {
        console.error('Error in createTimeCapsule:', err);
        res.status(500).json({ message: 'Failed to create time capsule', error: err });
    }
};

module.exports = { createTimeCapsule };