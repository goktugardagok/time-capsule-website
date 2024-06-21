const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const timeCapsuleRoutes = require('./routes/timeCapsuleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', timeCapsuleRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Time Capsule API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});