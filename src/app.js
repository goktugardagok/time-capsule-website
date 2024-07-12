const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const timeCapsuleRoutes = require('./src/routes/timeCapsuleRoutes');

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use('/api', timeCapsuleRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Route to display data
app.get('/', async (req, res) => {
    const TimeCapsule = mongoose.model('TimeCapsule');
    const data = await TimeCapsule.find();
    res.render('index', { data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));