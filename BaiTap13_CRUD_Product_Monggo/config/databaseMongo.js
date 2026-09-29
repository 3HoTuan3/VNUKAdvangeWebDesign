const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Product')
    .then(() => console.log('Connected to MongoDB Database!'))
    .catch(err => console.error('Connection error:', err));

module.exports = mongoose;