const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/timeCapsuleRoutes');
const { Storage } = require('@google-cloud/storage');
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
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Initialize Google Cloud Storage with the JSON content from the environment variable
const gcsKeyJson = JSON.parse(process.env.GCS_KEY_JSON);
const storage = new Storage({ credentials: gcsKeyJson });
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

module.exports = { bucket }; // Export the bucket for use in controllers