const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/shopdb')
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => console.error(err));

async function seed() {
    try {
        // 1. Xóa sạch dữ liệu cũ của cả 2 bảng
        await Category.deleteMany();
        await Product.deleteMany();

        // 2. Tạo trước danh sách Category
        const categoryNames = ['Điện thoại', 'Laptop', 'Phụ kiện', 'Máy tính bảng', 'Âm thanh'];
        const createdCategories = await Category.insertMany(
            categoryNames.map(name => ({ name }))
        );
        console.log('✅ Seed thành công Categories');

        // 3. Tạo 100 sản phẩm liên kết với các categoryId vừa tạo
        const products = [];
        for (let i = 0; i < 100; i++) {
            const randomCategory = createdCategories[Math.floor(Math.random() * createdCategories.length)];
            products.push({
                name: `Sản phẩm ${i + 1}`,
                price: Math.floor(Math.random() * 10000000) + 100000,
                stock: Math.floor(Math.random() * 100) + 1,
                description: `Mô tả chi tiết cho sản phẩm ${i + 1}`,
                categoryId: randomCategory._id // Gán đúng ObjectId của Category
            });
        }

        await Product.insertMany(products);
        console.log('✅ Seed thành công 100 sản phẩm với categoryId chuẩn ObjectId');
    } catch (err) {
        console.error('❌ Lỗi seed:', err);
    } finally {
        mongoose.connection.close();
    }
}

seed();