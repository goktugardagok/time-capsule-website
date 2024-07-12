const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');
const upload = require('../utils/fileStorage');

router.post('/submit', upload.single('file'), timeCapsuleController.createTimeCapsule);
router.get('/:id/countdown', timeCapsuleController.getCountdown);
router.get('/:id/content', timeCapsuleController.getContent);

module.exports = router;