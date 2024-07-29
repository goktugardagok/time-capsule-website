const express = require('express');
const multer = require('multer');
const path = require('path');
const {
    createTimeCapsule,
    getCountdown,
    getTimeCapsuleContent,
    getFile,
} = require('../controllers/timeCapsuleController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/submit', upload.single('file'), createTimeCapsule);
router.get('/countdown/:id', getCountdown);
router.get('/content/:id', getTimeCapsuleContent);
router.get('/file/:filename', getFile);

module.exports = router;