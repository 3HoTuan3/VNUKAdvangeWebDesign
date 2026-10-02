const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/productRoutes');
const pageRoutes = require('./routes/pageRoutes');

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Kích hoạt public
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sử dụng routes
app.use('/', pageRoutes);
app.use('/', productsRoutes);

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});