const express = require('express');
const app = express();
const timeCapsuleRoutes = require('./routes/timeCapsuleRoutes');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (if needed)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', timeCapsuleRoutes);

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Time Capsule API');
});

// Error handling middleware (optional)
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

// Start the server (ensure the port is correctly set)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});