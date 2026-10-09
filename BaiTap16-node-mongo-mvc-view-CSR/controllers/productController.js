const Product = require('../models/Product');
const Category = require('../models/Category');

// 1. Lấy danh sách kèm Lọc, Phân trang, Sắp xếp
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;
        const { category, sort, maxPrice } = req.query;
        const filter = {};
        if (category) filter.categoryId = category;
        if (maxPrice) filter.price = { $lte: parseInt(maxPrice) };
        const sortOption = {};
        if (sort === 'asc') sortOption.price = 1;
        else if (sort === 'desc') sortOption.price = -1;
        const [products, total] = await Promise.all([
            Product.find(filter)
                .populate('categoryId')
                .sort(sortOption)
                .skip(skip)
                .limit(limit),
            Product.countDocuments(filter)
        ]);
        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. Lấy danh mục
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. Lấy chi tiết
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId');
        if (!product) return res.status(404).json({ message: 'Không tìm thấy' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 4. Thêm sản phẩm
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 5. Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 6. Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Đã xóa sản phẩm thành công' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};