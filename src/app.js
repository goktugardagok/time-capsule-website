const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/timeCapsuleRoutes');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

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

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the Time Capsule API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize Google Cloud Storage with the JSON content from the environment variable
const gcsKeyJson = process.env.GCS_KEY_JSON;
const gcsKeyFile = path.join(__dirname, 'service-account-key.json');
fs.writeFileSync(gcsKeyFile, gcsKeyJson);

const storage = new Storage({ keyFilename: gcsKeyFile });

module.exports = app;