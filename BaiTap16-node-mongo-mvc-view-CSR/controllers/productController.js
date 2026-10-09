const Product = require('../models/Product');
const Category = require('../models/Category');

// Danh sách sản phẩm có lọc, phân trang, sắp xếp
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
            totalPages
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Form thêm
exports.newForm = async (req, res) => {
    const categories = await Category.find();
    res.render('products/new', { title: 'Thêm sản phẩm', categories });
};

// Tạo mới
exports.create = async (req, res) => {
    await Product.create(req.body);
    res.redirect('/products');
};

// Chi tiết
exports.detail = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('categoryId');
    res.render('products/detail', { title: 'Chi tiết sản phẩm', product });
};

// Form sửa
exports.editForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();
    res.render('products/edit', { title: 'Sửa sản phẩm', product, categories });
};

// Cập nhật
exports.update = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
};

// Xóa
exports.delete = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};

exports.getApiProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};