const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//router GET: lấy danh sách sản phẩm
router.get('/', productController.getProducts);

//router GET: chi tiết sản phẩm theo ID
router.get('/:id', productController.getProductById);

//router POST: thêm sản phẩm mới
router.post('/', productController.addProduct);

module.exports = router;