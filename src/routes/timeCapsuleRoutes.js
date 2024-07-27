const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { createTimeCapsule, getTimeCapsule, getCountdown } = require('../controllers/timeCapsuleController');

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'uploads', // bucket name
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

router.post('/submit', upload.single('file'), createTimeCapsule);
router.get('/timecapsules/:id', getTimeCapsule);
router.get('/countdown/:id', getCountdown);

module.exports = router;