const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');
const upload = require('../utils/fileStorage');

router.post('/submit', upload.single('file'), timeCapsuleController.createTimeCapsule);
router.get('/countdown/:id', timeCapsuleController.getCountdown);
router.get('/content/:id', timeCapsuleController.getContent);

module.exports = router;