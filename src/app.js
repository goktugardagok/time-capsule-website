const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('src/routes/timeCapsuleRoutes.js'); // Adjust the path if needed
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
const gcsKeyJson = process.env.GCS_KEY_JSON;
const gcsKeyFile = path.join(__dirname, 'service-account-key.json');
require('fs').writeFileSync(gcsKeyFile, gcsKeyJson);

const storage = new Storage({ keyFilename: gcsKeyFile });