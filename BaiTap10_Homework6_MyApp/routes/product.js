const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//router GET: lấy danh sách sản phẩm
router.get('/', productController.getProducts);

//router GET: chi tiết sản phẩm theo ID
router.get('/:id', productController.getProductsById);

module.exports = router;