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
    if(id === 'special') {
        res.status(200).json({
            message: 'Handling special DELETE requests to /orders/id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Handling DELETE requests to /orders/id',
            id: id
        });
    }
});


module.exports = router;