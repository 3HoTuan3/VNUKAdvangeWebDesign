const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

// Trang chủ
router.get('/', productCtrl.getHome);

// Trang thêm
router.get('/add', productCtrl.showAddForm);
router.post('/add', productCtrl.addProduct);

// Trang sửa
router.get('/edit/:id', productCtrl.showEditForm);
router.post('/edit/:id', productCtrl.updateProduct);

// Xóa
router.get('/delete/:id', productCtrl.deleteProduct);

module.exports = router;
