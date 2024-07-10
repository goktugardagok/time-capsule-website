const express = require('express');
const router = express.Router();

router.post('/submit', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.status(201).send('Data received successfully');
});

module.exports = router;