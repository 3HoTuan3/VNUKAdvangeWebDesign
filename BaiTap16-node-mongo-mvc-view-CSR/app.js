const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Parse JSON từ Client gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Phục vụ thư mục public (Chứa frontend HTML/JS/CSS)
app.use(express.static(path.join(__dirname, 'public')));

// REST API Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Tự động chuyển hướng trang chủ vào file show.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'show.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 CSR Server chạy tại: http://localhost:${PORT}`));