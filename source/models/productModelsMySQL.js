const mysql = require('mysql2/promise');
require('dotenv').config();

// Khởi tạo kết nối MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT || 3306
});


pool.getConnection()
  .then((conn) => {
    console.log("MySQL connected");
    conn.release();
  })
  .catch(err => {
    console.error("MySQL connection error:", err.message);
  });

async function getProductsByType(type) {
  try {
    if (type === 'new') {
      const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC LIMIT 16");
      return rows;
    } else if (type === 'top') {
      const [rows] = await pool.query("SELECT * FROM products WHERE promotion_price < unit_price LIMIT 16");
      return rows;
    } else {
      const [rows] = await pool.query("SELECT * FROM products");
      return rows;
    }
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { getProductsByType, pool };
