const TimeCapsule = require('../models/timeCapsuleModel');
const upload = require('../utils/fileStorage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const createTimeCapsule = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error uploading file' });
    }

    const { userId, text, openDate } = req.body;

    const newCapsule = new TimeCapsule({
      userId,
      text,
      openDate,
      fileId: req.file.id
    });

    newCapsule.save()
      .then(() => res.status(201).send({ message: 'Time capsule created successfully' }))
      .catch((err) => res.status(500).send({ message: 'Error creating time capsule', error: err }));
  });
};

module.exports = { createTimeCapsule };