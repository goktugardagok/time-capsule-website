const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const multerGoogleStorage = require('multer-google-storage');

const storage = new Storage({
  keyFilename: 'path/to/your-service-account-file.json',
  projectId: 'your-project-id',
});

const bucket = storage.bucket('your-bucket-name');

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: 'your-bucket-name',
    projectId: 'your-project-id',
    keyFilename: 'path/to/your-service-account-file.json',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

module.exports = uploadHandler;