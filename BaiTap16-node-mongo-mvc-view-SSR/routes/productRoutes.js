const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

// Danh sách & Bộ lọc
router.get('/', productCtrl.index);

// Thêm mới
router.get('/new', productCtrl.newForm);
router.post('/', productCtrl.create);

// Sửa
router.get('/edit/:id', productCtrl.editForm);
router.post('/edit/:id', productCtrl.update);

// Xóa
router.get('/delete/:id', productCtrl.delete);

// Chi tiết
router.get('/:id', productCtrl.detail);

module.exports = router;