const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/orders');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Order.find()
        .populate('product', 'name')
        .exec()
        .then(result => {
            res.status(200).json({
                orders: result,
                count: result.length
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    console.log(id);
    Order.remove({ _id: id })
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

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (product) {
                const order = new Order({
                    _id: new mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    productId: req.body.productId,
                    product: product
                });
                order.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            order: order
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            } else {
                res.status(404).json({
                    message: "Product Not Found! Can't place an order"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});


router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json({
                result: order
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;
