const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: path.join(__dirname, '..', 'config', process.env.GCS_KEY_FILE),
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

if (!process.env.GCS_BUCKET_NAME) {
  throw new Error('A bucket name is needed to use Cloud Storage.');
}

exports.saveFileToCloudStorage = async (file) => {
  try {
    if (!bucket) {
      throw new Error('Bucket is not initialized.');
    }

    const blob = bucket.file(Date.now() + '-' + file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      console.error('Blob stream error:', err);
      throw new Error('Unable to upload file.');
    });

    blobStream.on('finish', () => {
      console.log('File uploaded successfully');
    });

    blobStream.end(file.buffer);

    return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  } catch (error) {
    console.error('Error in saveFileToCloudStorage:', error);
    throw error;
  }
};