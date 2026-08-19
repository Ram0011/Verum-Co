const Product = require("../model/product.model");

exports.createProduct = async (data) => {
    const product = await Product.create(data);
    return product;
};

exports.getProducts = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 12;

    const skip = (page - 1) * limit;

    const filter = {};

    // Category
    if (query.category) {
        filter.category = query.category;
    }

    // Search
    if (query.search) {
        filter.name = {
            $regex: query.search,
            $options: "i",
        };
    }

    // Price
    if (query.minPrice || query.maxPrice) {
        filter.price = {};

        if (query.minPrice) {
            filter.price.$gte = Number(query.minPrice);
        }

        if (query.maxPrice) {
            filter.price.$lte = Number(query.maxPrice);
        }
    }

    // Sorting
    let sort = {};

    switch (query.sort) {
        case "price-low":
            sort = { price: 1 };
            break;

        case "price-high":
            sort = { price: -1 };
            break;

        case "newest":
        default:
            sort = { createdAt: -1 };
            break;
    }

    const products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(filter);

    return {
        total,
        page,
        pages: Math.ceil(total / limit),
        products,
    };
};

exports.getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
};
