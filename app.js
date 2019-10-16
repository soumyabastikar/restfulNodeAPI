const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'wohooo it works!'
//     });
// });

//Routes handling requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


module.exports = app;