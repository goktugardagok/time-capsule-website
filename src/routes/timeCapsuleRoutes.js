const express = require('express');
const router = express.Router();
const { createTimeCapsule, upload } = require('../controllers/timeCapsuleController');

router.post('/create', upload.single('file'), createTimeCapsule);

module.exports = router;