const express = require('express');
const router = express.Router();
const upload = require('../utils/fileStorage');
const { createTimeCapsule } = require('../controllers/timeCapsuleController');

router.post('/create', upload.single('file'), createTimeCapsule);

module.exports = router;