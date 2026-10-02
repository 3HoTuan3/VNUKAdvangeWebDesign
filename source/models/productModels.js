const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT || 3306 // using PORT=3306 from .env for DB connection
});

// Since the DB schema doesn't have an exact 'type' column with 'new'/'top' like the tutorial,
// we'll simulate 'new' products by getting recently created products (or just some products limit)
// and 'top' products by checking promotion_price or a different logic.
async function getProductsByType(type) {
  try {
    if (type === 'new') {
      // Giả lập sản phẩm mới: Lấy ngẫu nhiên hoặc theo ID mới nhất
      const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC LIMIT 4");
      return rows;
    } else if (type === 'top') {
      // Giả lập sản phẩm top: Lấy các sản phẩm có khuyến mãi hoặc giới hạn 4 cái
      const [rows] = await pool.query("SELECT * FROM products WHERE promotion_price < unit_price LIMIT 4");
      return rows;
    } else {
      const [rows] = await pool.query("SELECT * FROM products LIMIT 8");
      return rows;
    }
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { getProductsByType, pool };