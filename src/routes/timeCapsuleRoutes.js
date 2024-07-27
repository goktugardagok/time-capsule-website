const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const { createTimeCapsule, getTimeCapsule, getCountdown } = require('../controllers/timeCapsuleController');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Ensure MONGODB_URI is set
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

// Create a storage engine for GridFS
const storage = new GridFsStorage({
    url: mongoUri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            filename: `${Date.now()}-${file.originalname}`,
            bucketName: 'uploads',
        };
    },
});

const upload = multer({ storage });

// Create a time capsule
router.post('/create', upload.single('file'), createTimeCapsule);

// Get a time capsule
router.get('/timecapsules/:id', getTimeCapsule);

// Get countdown for a time capsule
router.get('/countdown/:id', getCountdown);

module.exports = router;