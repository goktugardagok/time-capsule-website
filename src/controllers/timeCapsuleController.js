const { Storage } = require('@google-cloud/storage');
const TimeCapsule = require('../models/timeCapsuleModel');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const createTimeCapsule = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body
    console.log('Request file:', req.file); // Log the file information

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('finish', async () => {
      console.log('File upload finished'); // Log when the file upload is finished

      const timeCapsule = new TimeCapsule({
        userId: req.body.userId,
        text: req.body.text,
        openDate: req.body.openDate,
        imageUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      });

      await timeCapsule.save();

      res.status(200).json({ message: 'Time capsule created successfully', timeCapsule });
    });

    blobStream.on('error', (err) => {
      console.error('Blob stream error:', err); // Log any blob stream errors
      res.status(500).json({ message: 'Failed to upload file to Google Cloud Storage', error: err });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    console.error('Error in createTimeCapsule:', err); // Log the error
    res.status(500).json({ message: 'Failed to create time capsule', error: err });
  }
};

module.exports = { createTimeCapsule };