const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/timeCapsuleRoutes');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the Time Capsule API');
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Read Google Cloud service account key from file
const gcsKeyPath = path.resolve(__dirname, process.env.GCS_KEY_PATH);
const gcsKeyJson = JSON.parse(fs.readFileSync(gcsKeyPath, 'utf8'));

const storage = new Storage({ credentials: gcsKeyJson });

module.exports = app;