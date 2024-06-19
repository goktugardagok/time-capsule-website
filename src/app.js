const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const timeCapsuleRoutes = require('./routes/timeCapsuleRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/timecapsules', timeCapsuleRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Time Capsule API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});