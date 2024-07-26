const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'uploads', // Setting the collection name, default name is fs
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

module.exports = upload;