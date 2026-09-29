const db = require('../config/databaseMySQL');

const Product = {
    getAllProducts: (callback) => {
        db.query('SELECT * FROM product', (err, results) => {
            if (err) return callback(err);
            return callback(null, results);
        });
    },
    getProductById: (id, callback) => {
        db.query('SELECT * FROM product WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            return callback(null, results[0]);
        });
    },
    createProduct: (productData, callback) => {
        db.query('INSERT INTO product (name, description, image, price) VALUES (?, ?, ?, ?)',
            [productData.name, productData.description, productData.image, productData.price],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    updateProduct: (id, productData, callback) => {
        db.query('UPDATE product SET name = ?, description = ?, image = ?, price = ? WHERE id = ?',
            [productData.name, productData.description, productData.image, productData.price, id],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    deleteProduct: (id, callback) => {
        db.query('DELETE FROM product WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            return callback(null, results);
        });
    }
};

module.exports = Product; 