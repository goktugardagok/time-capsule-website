const express = require('express');
const router = express.Router();
const { upload } = require('../utils/fileStorage');
const timeCapsuleController = require('../controllers/timeCapsuleController');

router.post('/create', upload.array('files', 10), timeCapsuleController.createTimeCapsule);
router.get('/countdown/:id', timeCapsuleController.getCountdown);
router.get('/content/:id', timeCapsuleController.getContent);

module.exports = router;