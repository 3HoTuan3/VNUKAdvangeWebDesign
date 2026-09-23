const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Import Router
const productRouter = require('./routes/product');

app.get('/', (req, res) => {
    res.redirect('/products');
});

//Use Router
app.use('/products', productRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});