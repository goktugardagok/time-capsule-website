const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads', // collection name
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

module.exports = upload;