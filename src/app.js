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

const decodedMongoURI = Buffer.from(process.env.MONGODB_URI_BASE64, 'base64').toString('utf-8');

mongoose.connect(decodedMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Time Capsule API');
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const gcsKeyJson = process.env.GCS_KEY_JSON;
const gcsKeyFile = path.join(__dirname, 'service-account-key.json');
require('fs').writeFileSync(gcsKeyFile, gcsKeyJson);

const storage = new Storage({ keyFilename: gcsKeyFile });