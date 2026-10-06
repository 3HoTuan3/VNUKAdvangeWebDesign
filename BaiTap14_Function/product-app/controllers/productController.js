const Product = require('../models/product');

// Hiển thị danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
};

// Hiển thị trang thêm sản phẩm
exports.showAddProductForm = (req, res) => {
    res.render('add');
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    const newProduct = new Product({
        name,
        price,
        quantity,
        image: `/uploads/${req.file.filename}`
    });
    await newProduct.save();
    res.redirect('/');
};

// Hiển thị trang chỉnh sửa sản phẩm
exports.showEditProductForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('edit', { product });
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    const updateData = { name, price, quantity };

    if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/');
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

// Hiển thị chi tiết sản phẩm
exports.showProductDetail = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('show', { product });
};

// Tìm kiếm sản phẩm
exports.searchProduct = async (req, res) => {
    const query = req.query.q;
    const products = await Product.find({ name: { $regex: query, $options: 'i' } });
    res.render('index', { products });
};
