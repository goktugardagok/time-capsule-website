const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createTimeCapsule, getCountdown, getContent } = require('../controllers/timeCapsuleController');

const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/submit', upload.single('file'), createTimeCapsule);
router.get('/countdown/:id', getCountdown);
router.get('/content/:id', getContent);

module.exports = router;