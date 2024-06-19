const { Storage } = require('@google-cloud/storage');
const path = require('path');
const multer = require('multer');
const MulterGoogleCloudStorage = require('multer-google-storage').storageEngine;

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: path.join(__dirname, '..', process.env.GCS_KEY_FILE)
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const upload = multer({
  storage: MulterGoogleCloudStorage({
    bucket: process.env.GCS_BUCKET_NAME,
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: path.join(__dirname, '..', process.env.GCS_KEY_FILE),
    destination: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

const deleteFile = async (filename) => {
  try {
    await bucket.file(filename).delete();
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
};

module.exports = { upload, deleteFile };