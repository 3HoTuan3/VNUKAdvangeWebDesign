const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () =>
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
);
