const product = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 5.99 },
];

exports.getProducts = (req, res) => {
    res.render('products', { products: product });
};

exports.getProductsById = (req, res) => {
    const foundProduct = product.find(p => p.id == req.params.id);
    if (foundProduct) {
        res.send(`<h1>${foundProduct.name}</h1><p>Price: $${foundProduct.price}</p>`);
    } else {
        res.send('<h1>Product not found</h1>');
    }
};