const express = require('express');
const multer = require('multer');
const { createTimeCapsule, getFile } = require('../controllers/timeCapsuleController');
const storage = require('../utils/fileStorage');

const router = express.Router();
const upload = multer({ storage });

router.post('/create', upload.single('file'), createTimeCapsule);
router.get('/file/:id', getFile);

module.exports = router;