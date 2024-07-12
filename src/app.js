const express = require('express');
const mongoose = require('mongoose');
const timeCapsuleRoutes = require('./routes/timeCapsuleRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/api', timeCapsuleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});