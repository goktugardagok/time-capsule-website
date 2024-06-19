const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');
const { upload } = require('../utils/fileStorage'); // Assuming you have a fileStorage utility

router.get('/all', timeCapsuleController.getAllTimeCapsules);
router.post('/create', upload.single('file'), timeCapsuleController.createTimeCapsule);

module.exports = router;