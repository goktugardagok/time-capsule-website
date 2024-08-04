const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            filename: `${Date.now()}-${file.originalname}`,
            bucketName: 'uploads'
        };
    }
});

const upload = multer({ storage });

module.exports = { upload };