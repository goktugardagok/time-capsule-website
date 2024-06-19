const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const multerGoogleStorage = require('multer-google-storage');

const storage = new Storage({
  keyFilename: 'C:/Users/goktu/OneDrive/Desktop/time-capsule-website/src/config/service-account-key.json', // Your actual path
  projectId: 'timecapsulecloud', // Your actual project ID
});

const bucket = storage.bucket('time-capsule-bucket'); // Your actual bucket name

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: 'time-capsule-bucket', // Your actual bucket name
    projectId: 'timecapsulecloud', // Your actual project ID
    keyFilename: 'C:/Users/goktu/OneDrive/Desktop/time-capsule-website/src/config/service-account-key.json', // Your actual path
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

module.exports = uploadHandler;