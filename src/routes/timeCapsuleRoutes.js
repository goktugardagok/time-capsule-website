const express = require('express');
const multer = require('multer');
const { createTimeCapsule, getTimeCapsule, getCountdown } = require('../controllers/timeCapsuleController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/submit', upload.single('file'), createTimeCapsule);
router.get('/timecapsules/:id', getTimeCapsule);
router.get('/countdown/:id', getCountdown);

module.exports = router;