const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/service-account-key.json'),
});

const bucket = storage.bucket('time-capsule-bucket');

const uploadFile = async (file) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(Date.now() + '-' + originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    console.log(err);
  });

  blobStream.on('finish', () => {
    console.log('File uploaded successfully.');
  });

  blobStream.end(buffer);
};

module.exports = {
  uploadFile,
};