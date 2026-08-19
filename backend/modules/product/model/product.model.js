const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: "",
        },
    },
    { _id: false },
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        originalPrice: {
            type: Number,
            default: null,
        },

        images: {
            type: [imageSchema],
            validate: [
                (arr) => arr.length > 0,
                "At least one image is required",
            ],
        },

        category: {
            type: String,
            required: true,
        },

        stock: {
            type: Number,
            default: 0,
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        reviews: {
            type: Number,
            default: 0,
        },

        badge: {
            type: String,
            enum: ["New", "Best Seller", "Popular", "20% OFF", ""],
            default: "",
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Product", productSchema);
