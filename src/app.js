const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const timeCapsuleRoutes = require('./routes/timeCapsuleRoutes'); // Updated path

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/timecapsules', timeCapsuleRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});