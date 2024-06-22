const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const { format } = require('util');

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILE,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

const uploadFile = async (file) => {
  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
};

module.exports = { upload, uploadFile };