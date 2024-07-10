const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');

router.post('/create', timeCapsuleController.createTimeCapsule);

module.exports = router;