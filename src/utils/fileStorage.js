const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
        return {
            bucketName: 'uploads', // GridFS collection name
            filename: `${Date.now()}_${file.originalname}`
        };
    }
});

module.exports = storage;