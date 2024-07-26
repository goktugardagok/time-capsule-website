const express = require('express');
const multer = require('multer');
const { createTimeCapsule, getTimeCapsuleCountdown, getTimeCapsuleContent } = require('../controllers/timeCapsuleController');
const { storage } = require('../utils/fileStorage');

const router = express.Router();
const upload = multer({ storage });

router.post('/api/submit', upload.array('files', 10), createTimeCapsule); // Allow up to 10 files
router.get('/api/countdown/:id', getTimeCapsuleCountdown);
router.get('/api/content/:id', getTimeCapsuleContent);

module.exports = router;