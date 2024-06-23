const express = require('express');
const router = express.Router();
const multer = require('multer');
const timeCapsuleController = require('../controllers/timeCapsuleController'); // Correct relative path

// Configure Multer storage and file filter
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', upload.single('file'), timeCapsuleController.createTimeCapsule);

module.exports = router;