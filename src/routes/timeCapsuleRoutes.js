const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createTimeCapsule, getCountdown, getContent } = require('../controllers/timeCapsuleController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/submit', upload.single('file'), createTimeCapsule);
router.get('/countdown', getCountdown);
router.get('/content', getContent);

module.exports = router;