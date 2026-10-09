const Product = require('../models/Product');

// Controller cơ bản cho các thao tác CRUD với sản phẩm
// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // lấy tất cả
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Đã xóa sản phẩm' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller nâng cao
// Tìm kiếm sản phẩm theo category và maxPrice Lệnh: /api/products/search?category=Phone&maxPrice=30000
exports.searchProducts = async (req, res) => {
    try {
        const { category, maxPrice } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (maxPrice) filter.price = { $lte: parseInt(maxPrice) };
        const result = await Product.find(filter);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Sắp xếp dữ liệu /api/products/sort?order=asc
exports.sortProducts = async (req, res) => {
    const order = req.query.order === 'desc' ? -1 : 1;
    const sorted = await Product.find().sort({ price: order });
    res.json(sorted);
};
// Phân trang dữ liệu /api/products/page?page=2&limit=5
exports.paginateProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const data = await Product.find().skip(skip).limit(limit);
    res.json(data);
};
// Tổng hợp (Aggregation) /api/products/aggregate
exports.avgPriceByCategory = async (req, res) => {
    const result = await Product.aggregate([
        { $group: { _id: "$category", avgPrice: { $avg: "$price" } } }
    ]);
    res.json(result);
};
// Update nhiều sản phẩm cùng lúc, Tăng giá 10% cho tất cả sản phẩm trong 1 category
exports.increasePrice = async (req, res) => {
    const { category } = req.body;
    await Product.updateMany(
        { category },
        { $mul: { price: 1.1 } } // nhân giá lên 10%
    );
    res.json({ message: "Đã cập nhật giá" });
};
// Xóa nhiều sản phẩm cùng lúc
exports.deleteByCategory = async (req, res) => {
    const { category } = req.body;
    const result = await Product.deleteMany({ category });
    res.json({ message: `Đã xóa ${result.deletedCount} sản phẩm trong ${category}` });
};
