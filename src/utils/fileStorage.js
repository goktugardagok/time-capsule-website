const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

// MongoDB URI
const mongoURI = process.env.MONGODB_URI;

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            bucketName: 'uploads', // Bucket name in MongoDB
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

module.exports = upload;