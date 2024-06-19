const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');

// GET /api/timecapsules/all
router.get('/all', timeCapsuleController.getAllTimeCapsules);

module.exports = router;