const cartService = require("../service/cart.service");

exports.addToCart = async (req, res, next) => {
    try {
        const cart = await cartService.addToCart(
            req.user.id,
            req.body.productId,
            req.body.quantity,
        );
        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
};

exports.getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await cartService.removeFromCart(
            req.user.id,
            req.params.productId,
        );
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

exports.updateCartQuantity = async (req, res, next) => {
    try {
        const cart = await cartService.updateCartQuantity(
            req.user.id,
            req.params.productId,
            req.body.quantity,
        );

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};
