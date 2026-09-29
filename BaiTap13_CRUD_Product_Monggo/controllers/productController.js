const Product = require('../models/productModel');

const productController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find({});
            res.render('products/index', { products });
        } catch (err) {
            res.status(500).json({ error: 'Database query error' });
        }
    },
    showAddProductForm: (req, res) => {
        res.render('products/new', { product: {} });
    },
    addProduct: async (req, res) => {
        try {
            await Product.create(req.body);
            res.redirect('/products');
        } catch (err) {
            res.status(500).json({ error: 'Failed to add product' });
        }
    },
    showEditProductForm: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.render('products/edit', { product });
        } catch (err) {
            res.status(500).json({ error: 'Failed to retrieve product' });
        }
    },
    updateProduct: async (req, res) => {
        try {
            await Product.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/products');
        } catch (err) {
            res.status(500).json({ error: 'Failed to update product' });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.redirect('/products');
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
};

module.exports = productController;