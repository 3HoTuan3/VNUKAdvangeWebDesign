const Product = require('../models/productModels');

exports.getHomePage = async (req, res) => {
    try {
        const newProducts = await Product.getProductsByType('new');
        const topProducts = await Product.getProductsByType('top');
        
        res.render('index', { newProducts, topProducts, title: 'Trang chủ' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading products from database");
    }
};