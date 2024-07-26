const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');

router.post('/api/submit', timeCapsuleController.createTimeCapsule);
router.get('/api/countdown/:id', timeCapsuleController.getCountdown);
router.get('/api/content/:id', timeCapsuleController.getContent);

module.exports = router;