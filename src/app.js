const express = require('express');
const mongoose = require('mongoose');
const timeCapsuleRoutes = require('./routes/timeCapsuleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('MongoDB connection error:', err);
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Time Capsule API');
});

app.use('/api/timecapsules', timeCapsuleRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});