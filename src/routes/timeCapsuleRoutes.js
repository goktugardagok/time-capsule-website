const express = require('express');
const router = express.Router();
const upload = require('../utils/fileStorage'); // Adjust the path if necessary
const timeCapsuleController = require('../controllers/timeCapsuleController');

router.post('/create', upload.single('file'), timeCapsuleController.createTimeCapsule);

module.exports = router;