const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage').default;

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILE
});

const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.GCS_BUCKET_NAME,
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILE,
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

module.exports = upload;