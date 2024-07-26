const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');

router.post('/submit', timeCapsuleController.createTimeCapsule);
router.get('/countdown/:id', timeCapsuleController.getCountdown);
router.get('/content/:id', timeCapsuleController.getContent);

module.exports = router;