const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
require('dotenv').config();

async function migrate() {
    console.log("Bắt đầu quá trình chuyển đổi dữ liệu từ MySQL sang MongoDB...");

    try {
        // 1. Kết nối MongoDB
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/db_banhang';
        await mongoose.connect(mongoUri);
        console.log("Đã kết nối MongoDB (" + mongoUri + ")");

        // 2. Kết nối MySQL 
        const pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'Hotuan10030705*',
            database: process.env.DB_NAME || 'db_banhang',
            port: process.env.PORT || 3306
        });
        console.log("Đã kết nối MySQL (db_banhang)");

        // Các bảng có trong db_banhang.sql
        const tables = ['products', 'type_products', 'slide', 'users', 'news', 'customer', 'bills', 'bill_detail'];

        for (const table of tables) {
            console.log(`\nĐang đọc bảng '${table}' từ MySQL...`);
            const [rows] = await pool.query(`SELECT * FROM ${table}`);
            console.log(`- Tìm thấy ${rows.length} dòng.`);

            if (rows.length > 0) {
                // Tạo Schema mở (strict: false) để nhận mọi column từ MySQL thành field của MongoDB
                const TempModel = mongoose.models[table] || mongoose.model(table, new mongoose.Schema({}, { strict: false, collection: table }));
                
                // Xóa data cũ (nếu có) để tránh trùng lặp khi chạy nhiều lần
                await TempModel.deleteMany({});
                
                // Insert toàn bộ dữ liệu vào Mongo
                await TempModel.insertMany(rows);
                console.log(`  -> Import thành công ${rows.length} dòng vào collection '${table}' của MongoDB.`);
            }
        }

        console.log("\nHOÀN TẤT CHUYỂN ĐỔI DỮ LIỆU!");
    } catch (error) {
        console.error("Xảy ra lỗi trong quá trình chạy:", error.message);
    } finally {
        process.exit(0);
    }
}

migrate();
