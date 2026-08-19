const wishlistService = require("../service/wishlist.service");

exports.addToWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.addToWishlist(
            req.user.id,
            req.params.productId,
        );

        res.status(201).json(wishlist);
    } catch (error) {
        next(error);
    }
};

exports.getWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.getWishlist(req.user.id);

        res.status(200).json(wishlist);
    } catch (error) {
        next(error);
    }
};

exports.removeFromWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.removeFromWishlist(
            req.user.id,
            req.params.productId,
        );

        res.status(200).json(wishlist);
    } catch (error) {
        next(error);
    }
};
