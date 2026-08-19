const Cart = require("../../cart/model/cart.model");
const Order = require("../../order/model/order.model");

exports.createOrder = async (userId, shippingAddress) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length == 0) {
        throw new Error("Cart is Empty");
    }

    //snapshot items
    const items = cart.items.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        thumbnail: item.product.images?.[0]?.url || "",
    }));

    //calcualte total
    const totalAmount = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    const order = await Order.create({
        user: userId,
        items,
        totalAmount,
        shippingAddress,
    });

    //clear cart after order
    cart.items = [];
    await cart.save();
    return order;
};

exports.getMyOrders = async (userId) => {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return orders;
};
