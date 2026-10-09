const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

// API trả về JSON cho frontend / show.html
router.get('/', productCtrl.getApiProducts);

// Các route phục vụ EJS View (nếu dùng)
router.get('/view', productCtrl.index);
router.get('/new', productCtrl.newForm);
router.post('/', productCtrl.create);
router.get('/edit/:id', productCtrl.editForm);
router.post('/edit/:id', productCtrl.update);
router.get('/delete/:id', productCtrl.delete);
router.get('/:id', productCtrl.detail);

module.exports = router;