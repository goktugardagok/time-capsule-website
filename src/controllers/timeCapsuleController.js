const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const TimeCapsule = require('../models/timeCapsuleModel');

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const createTimeCapsule = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const timeCapsule = new TimeCapsule({
            userId: req.body.userId,
            text: req.body.text,
            openDate: req.body.openDate,
            imageUrl: `/api/file/${req.file.id}`
        });

        await timeCapsule.save();

        res.status(200).json({ message: 'Time capsule created successfully', timeCapsule });
    } catch (err) {
        console.error('Error in createTimeCapsule:', err);
        res.status(500).json({ message: 'Failed to create time capsule', error: err });
    }
};

const getFile = async (req, res) => {
    try {
        gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
            if (!file || file.length === 0) {
                return res.status(404).json({ message: 'No file exists' });
            }
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        });
    } catch (err) {
        console.error('Error in getFile:', err);
        res.status(500).json({ message: 'Failed to get file', error: err });
    }
};

module.exports = { createTimeCapsule, getFile };