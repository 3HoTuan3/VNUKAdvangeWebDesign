const mongoose = require('mongoose');
require('dotenv').config();

// Khởi tạo kết nối MongoDB
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB connected"))
      .catch(err => console.error("MongoDB connection error:", err.message));
} else {
    console.warn("MONGO_URI is not defined in .env");
}

// Schema cho Product
const productSchema = new mongoose.Schema({
  name: String,
  unit_price: Number,
  promotion_price: Number,
  image: String,
  tag: String,
  type: String,
  description: String
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

async function getProductsByType(type) {
  try {
    if (type === 'new') {
      // Lấy danh sách sản phẩm mới
      return await Product.find().sort({ _id: -1 }).limit(16);
    } else if (type === 'top') {
      // Lấy danh sách sản phẩm khuyến mãi
      return await Product.find({ promotion_price: { $gt: 0 } }).limit(16);
    } else {
      return await Product.find();
    }
  } catch (error) {
    console.error("MongoDB query error:", error);
    throw error;
  }
}

module.exports = { getProductsByType, Product };
