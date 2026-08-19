const orderService = require("../service/order.service");

exports.createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(
            req.user.id,
            req.body.shippingAddress,
        );
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getMyOrders(req.user.id);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};
