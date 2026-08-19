const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    name: String,
    price: Number,
    quantity: Number,
    thumbnail: String,
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [orderItemSchema],
        totalAmount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            fullName: String,
            address: String,
            city: String,
            postalCode: String,
            country: String,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true },
);

module.exports = new mongoose.model("Order", orderSchema);
