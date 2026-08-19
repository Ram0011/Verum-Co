const AppError = require("../../../utils/AppError");
const Wishlist = require("../model/wishlist.model");

exports.addToWishlist = async (userId, productId) => {
    let wishlist = await Wishlist.findOne({
        user: userId,
    });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: userId,
            products: [productId],
        });

        return wishlist.populate("products");
    }

    const alreadyExists = wishlist.products.some(
        (product) => product.toString() === productId,
    );

    if (alreadyExists) {
        throw new AppError("Product is already in your wishlist", 400);
    }

    wishlist.products.push(productId);

    await wishlist.save();

    return wishlist.populate("products");
};

exports.getWishlist = async (userId) => {
    const wishlist = await Wishlist.findOne({
        user: userId,
    }).populate("products");

    if (!wishlist) {
        return {
            products: [],
        };
    }

    return wishlist;
};

exports.removeFromWishlist = async (userId, productId) => {
    const wishlist = await Wishlist.findOne({
        user: userId,
    });

    if (!wishlist) {
        throw new AppError("Wishlist not found", 404);
    }

    wishlist.products = wishlist.products.filter(
        (product) => product.toString() !== productId,
    );

    await wishlist.save();

    return wishlist.populate("products");
};
