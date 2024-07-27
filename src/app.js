require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const timeCapsuleRoutes = require('./src/routes/timeCapsuleRoutes');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', timeCapsuleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;