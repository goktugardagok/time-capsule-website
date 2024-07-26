const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('../utils/fileStorage');
const upload = multer({ storage });
const {
    createTimeCapsule,
    getCountdown,
    getContent
} = require('../controllers/timeCapsuleController');

router.post('/api/submit', upload.array('files', 10), createTimeCapsule); // Adjust to handle multiple files
router.get('/api/countdown/:id', getCountdown);
router.get('/api/content/:id', getContent);

module.exports = router;