const AppError = require("../../../utils/AppError");
const Cart = require("../model/cart.model");

exports.addToCart = async (userId, productId, quantity) => {
    if (quantity <= 0) {
        throw new AppError("Quantity must be greater than 0", 400);
    }

    let cart = await Cart.findOne({ user: userId });

    // create cart if not exist
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [],
        });
    }

    //check existing product
    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId,
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            product: productId,
            quantity,
        });
    }
    await cart.save();

    await cart.populate("items.product");

    return cart;
};

exports.getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    return cart;
};

exports.removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError("Cart not found ", 404);

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
    );

    await cart.save();

    await cart.populate("items.product");

    return cart;
};

exports.updateCartQuantity = async (userID, productId, quantity) => {
    if (quantity <= 0) {
        throw new AppError("Quantity must be greater than 0 ", 400);
    }

    const cart = await Cart.findOne({ user: userID });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const item = cart.items.find(
        (item) => item.product.toString() === productId,
    );

    if (!item) {
        throw new AppError("Product not found in cart", 404);
    }

    item.quantity = quantity;

    await cart.save();
    await cart.populate("items.product");

    return cart;
};
