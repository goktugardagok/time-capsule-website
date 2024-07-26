const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const crypto = require('crypto');
const path = require('path');

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs, gridFSBucket;

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
    } else {
        const db = client.db('your-database-name'); // Replace with your database name
        gfs = new GridFSBucket(db, { bucketName: 'uploads' });
        console.log('MongoDB connected and GridFSBucket initialized');
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            cb(null, filename);
        });
    }
});

const upload = multer({ storage });

module.exports = upload;