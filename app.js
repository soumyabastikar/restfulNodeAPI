const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://user1:user1pwd@cluster0-v8nkf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

//logging
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); //to make the uploads folder available to everyone for use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling CORS(Cross Origin Resource Sharing) Errors
// * => the urls for which you want to give access eg. https://example.com
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Routes handling requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
