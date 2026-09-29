const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const productRoutes = require('./routes/productRoutes');

// Kết nối database
require('./config/databaseMongo');

// Thiết lập EJS làm template engine  																					
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Tự động chuyển hướng từ root đến danh sách sản phẩm
app.get('/', (req, res) => {
    res.redirect('/products');
});

// Middleware  																					
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Sử dụng định tuyến sản phẩm  																					
app.use('/', productRoutes);

// Lắng nghe cổng  																					
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
