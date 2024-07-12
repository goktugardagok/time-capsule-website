const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const timeCapsuleRoutes = require('./routes/timeCapsuleRoutes');
const TimeCapsule = require('./models/timeCapsuleModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', timeCapsuleRoutes);

// Default route
app.get('/', async (req, res) => {
  try {
    const timeCapsules = await TimeCapsule.find();
    res.render('index', { data: timeCapsules });
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;