const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

// API CRUD & Query
router.get('/', productCtrl.getProducts);          // Lấy danh sách (hỗ trợ lọc, sort, pagination)
router.get('/categories', productCtrl.getCategories); // Lấy danh sách danh mục để đổ vào ô Select
router.get('/:id', productCtrl.getProductById);   // Xem chi tiết
router.post('/', productCtrl.createProduct);       // Thêm mới
router.put('/:id', productCtrl.updateProduct);     // Cập nhật
router.delete('/:id', productCtrl.deleteProduct);  // Xóa

module.exports = router;