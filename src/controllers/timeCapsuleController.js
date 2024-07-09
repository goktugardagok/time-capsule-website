const TimeCapsule = require('../models/timeCapsuleModel');
const upload = require('../utils/fileStorage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

const createTimeCapsule = async (req, res) => {
    try {
        const { userId, text, openDate } = req.body;
        const file = req.file;

        const newTimeCapsule = new TimeCapsule({
            userId,
            text,
            openDate,
            fileId: file.id,
            fileName: file.filename
        });

        await newTimeCapsule.save();

        res.status(201).json({ message: 'Time capsule created successfully' });
    } catch (error) {
        console.error('Error creating time capsule:', error);
        res.status(500).json({ error: 'Error creating time capsule' });
    }
};

module.exports = {
    createTimeCapsule
};