const TimeCapsule = require('../models/TimeCapsule');

exports.getAllTimeCapsules = async (req, res) => {
    try {
        const timeCapsules = await TimeCapsule.find();
        res.json(timeCapsules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};