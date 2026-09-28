const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const squareRoutes = require('./routes/squareRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB  															
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Sử dụng EJS làm view engine  															
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Middleware  															
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng routes  															
app.use('/', squareRoutes);

// Chạy ứng dụng  															
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
