const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        // const now = new Date().toISOString();
        // const date = now.replace(/:/g, '-');
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
const Product = require('../models/products');

//Adding a new product to the DB
router.post('/', upload.single('productImage'), (req, res, next) => {
    // const prod = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /products.Adding a new product to the DB',
                createdProduct: product
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

//Fetching details of a specific product from the DB
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                res.status(200).json({
                    product: result
                });
            } else {
                res.status(404).json({
                    message: "Object Not Found!"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

//Fetching all the products from the DB
router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Updating a product in the DB
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//Deleting a product from the DB
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id);
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;
