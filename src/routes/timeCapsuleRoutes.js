const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const timeCapsuleController = require('../controllers/timeCapsuleController');

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return {
            filename: Date.now() + '-' + file.originalname
        };
    }
});
const upload = multer({ storage });

// Routes
router.post('/submit', upload.single('file'), timeCapsuleController.createTimeCapsule);
router.get('/countdown/:id', timeCapsuleController.getCountdown);
router.get('/content/:id', timeCapsuleController.getContent);

module.exports = router;