const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Cấu hình Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Các route cho sản phẩm
router.get('/', productController.getAllProducts);
router.get('/add', productController.showAddProductForm);
router.post('/add', upload.single('image'), productController.addProduct);
router.get('/edit/:id', productController.showEditProductForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);
router.get('/products/:id', productController.showProductDetail);
router.get('/search', productController.searchProduct);

module.exports = router;
