const Product = require('../models/Product');
const Category = require('../models/Category');

// Danh sách sản phẩm
exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const { category, sort, maxPrice } = req.query;
        const filter = {};

        if (category) filter.categoryId = category;
        if (maxPrice) filter.price = { $lte: parseInt(maxPrice) };
        const sortOption = {};
        if (sort === 'asc') sortOption.price = 1;
        else if (sort === 'desc') sortOption.price = -1;
        const [products, categories, total] = await Promise.all([
            Product.find(filter)
                .populate('categoryId')
                .sort(sortOption)
                .skip(skip)
                .limit(limit),
            Category.find(),
            Product.countDocuments(filter)
        ]);
        const totalPages = Math.ceil(total / limit);
        res.render('products/index', {
            title: 'Danh sách sản phẩm nâng cao',
            products,
            categories,
            currentPage: page,
            totalPages,
            query: req.query
        });
    } catch (err) {
        res.status(500).send('Lỗi máy chủ: ' + err.message);
    }
};

// Form thêm mới
exports.newForm = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('products/new', { title: 'Thêm sản phẩm', categories });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Tạo mới
exports.create = async (req, res) => {
    try {
        await Product.create(req.body);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('Lỗi thêm sản phẩm: ' + err.message);
    }
};

// Xem chi tiết
exports.detail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId');
        if (!product) return res.status(404).send('Không tìm thấy sản phẩm');
        res.render('products/detail', { title: 'Chi tiết sản phẩm', product });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Form sửa
exports.editForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const categories = await Category.find();
        if (!product) return res.status(404).send('Không tìm thấy sản phẩm');
        res.render('products/edit', { title: 'Sửa sản phẩm', product, categories });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Cập nhật
exports.update = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('Lỗi cập nhật: ' + err.message);
    }
};

// Xóa
exports.delete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('Lỗi xóa sản phẩm: ' + err.message);
    }
};