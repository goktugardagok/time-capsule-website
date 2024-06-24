const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/timeCapsuleRoutes');
const { Storage } = require('@google-cloud/storage');
const { GoogleAuth } = require('google-auth-library');

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
const gcsKeyJson = JSON.parse(process.env.GCS_KEY_JSON);
const auth = new GoogleAuth({
  credentials: gcsKeyJson,
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

const storage = new Storage({ auth });

module.exports = app;