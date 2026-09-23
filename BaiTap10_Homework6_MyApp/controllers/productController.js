const Product = require('../model/productModel');

exports.getProducts = (req, res) => {
    const products = Product.getAll();
    res.render('products', { products });
};

exports.getProductById = (req, res) => {
    const product = Product.getById(req.params.id);
    if (product) {
        res.render('product-detail', { product });
    } else {
        res.status(404).render('product-detail', { product: null });
    }
};

exports.addProduct = (req, res) => {
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        image: req.body.image || 'https://via.placeholder.com/150'
    };
    Product.add(newProduct);
    res.redirect('/products');
};