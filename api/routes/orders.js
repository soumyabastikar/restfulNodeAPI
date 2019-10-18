const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});


router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling DELETE requests to /orders/id',
        id: orderId
    });
});

router.post('/:orderId', (req, res, next) => {

    const id = req.params.orderId;
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };

    if (id === 'special') {
        res.status(200).json({
            message: 'Handling special POST requests to /orders/id',
            id: id,
            order: order
        });
    } else {
        res.status(200).json({
            message: 'Handling POST requests to /orders/id',
            id: id,
            order: order
        });
    }
});


module.exports = router;