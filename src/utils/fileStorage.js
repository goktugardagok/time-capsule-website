const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads', // default bucket name
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

module.exports = upload;