const express = require('express');
const router = express.Router();
const timeCapsuleController = require('../controllers/timeCapsuleController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
  res.send('Time Capsules API');
});

router.post('/create', upload.single('file'), timeCapsuleController.createTimeCapsule);
router.get('/all', timeCapsuleController.getAllTimeCapsules);

module.exports = router;