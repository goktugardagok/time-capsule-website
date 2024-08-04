const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createTimeCapsule, getCountdown, getContent } = require('../controllers/timeCapsuleController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post('/submit', upload.single('file'), createTimeCapsule);
router.get('/countdown', getCountdown);
router.get('/content', getContent);

module.exports = router;