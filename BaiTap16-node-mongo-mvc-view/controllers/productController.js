const Product = require('../models/Product');

// Trang chủ - hiển thị danh sách
exports.getHome = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { title: 'Danh sách sản phẩm', products });
    } catch (err) {
        res.send('Lỗi tải sản phẩm: ' + err.message);
    }
};
// Trang thêm sản phẩm
exports.showAddForm = (req, res) => {
    res.render('add', { title: 'Thêm sản phẩm mới' });
};
// Xử lý thêm sản phẩm
exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('/');
    } catch (err) {
        res.send('Lỗi khi thêm sản phẩm: ' + err.message);
    }
};
// Trang sửa sản phẩm
exports.showEditForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('edit', { title: 'Cập nhật sản phẩm', product });
    } catch (err) {
        res.send('Không tìm thấy sản phẩm');
    }
};
// Xử lý cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (err) {
        res.send('Lỗi khi cập nhật: ' + err.message);
    }
};
// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.send('Lỗi khi xóa: ' + err.message);
    }
};
