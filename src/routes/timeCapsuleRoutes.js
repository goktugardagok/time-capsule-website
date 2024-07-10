const express = require('express');
const { createTimeCapsule } = require('../controllers/timeCapsuleController');

const router = express.Router();

router.post('/create', createTimeCapsule);

module.exports = router;