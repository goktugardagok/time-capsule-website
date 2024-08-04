const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: Date.now() + path.extname(file.originalname),
            bucketName: 'uploads'
        };
    }
});

const upload = multer({ storage });

module.exports = upload;