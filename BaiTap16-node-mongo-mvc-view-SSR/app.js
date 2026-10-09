const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Cấu hình View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware phân tích dữ liệu Form gửi lên
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes chính
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Tự động chuyển hướng từ trang chủ về /products
app.get('/', (req, res) => res.redirect('/products'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server SSR chạy tại: http://localhost:${PORT}`);
});