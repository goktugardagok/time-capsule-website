const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const multer = require('multer');
require('dotenv').config();

// MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'uploads', // bucket name in MongoDB
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

module.exports = upload;