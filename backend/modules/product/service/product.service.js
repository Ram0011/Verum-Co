const Product = require("../model/product.model");
const AppError = require("../../../utils/AppError");

// Accept images as ["https://..."] or [{ url }] or "single-url" and
// always normalize to [{ url, alt }] so Mongoose validation passes.
function normalizeImages(images, name = "") {
    let list = images;

    if (typeof list === "string") {
        list = list
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    if (!Array.isArray(list)) return [];

    return list
        .map((img) => {
            if (typeof img === "string") {
                const url = img.trim();
                return url ? { url, alt: name || "" } : null;
            }
            if (img && typeof img === "object" && typeof img.url === "string" && img.url.trim()) {
                return { url: img.url.trim(), alt: img.alt || name || "" };
            }
            return null;
        })
        .filter(Boolean);
}

function validatePayload(data, isUpdate = false) {
    if (!isUpdate || data.name !== undefined) {
        if (!data.name || !String(data.name).trim()) {
            throw new AppError("Product name is required", 400);
        }
    }
    if (!isUpdate || data.description !== undefined) {
        if (!data.description || !String(data.description).trim()) {
            throw new AppError("Product description is required", 400);
        }
    }
    if (!isUpdate || data.price !== undefined) {
        if (data.price === undefined || data.price === null || data.price === "") {
            throw new AppError("Product price is required", 400);
        }
        if (Number.isNaN(Number(data.price)) || Number(data.price) < 0) {
            throw new AppError("Product price must be a valid non-negative number", 400);
        }
    }
    if (!isUpdate || data.category !== undefined) {
        if (!data.category || !String(data.category).trim()) {
            throw new AppError("Product category is required", 400);
        }
    }
    if (data.stock !== undefined && (Number.isNaN(Number(data.stock)) || Number(data.stock) < 0)) {
        throw new AppError("Stock must be a valid non-negative number", 400);
    }
    if (data.originalPrice !== undefined && data.originalPrice !== null && data.originalPrice !== "") {
        if (Number.isNaN(Number(data.originalPrice)) || Number(data.originalPrice) < 0) {
            throw new AppError("Original price must be a valid non-negative number", 400);
        }
    }
}

exports.createProduct = async (data) => {
    validatePayload(data, false);

    const images = normalizeImages(data.images, data.name);
    if (images.length === 0) {
        throw new AppError("At least one product image URL is required", 400);
    }

    const product = await Product.create({
        name: String(data.name).trim(),
        seller: data.seller,
        description: String(data.description).trim(),
        price: Number(data.price),
        originalPrice:
            data.originalPrice === undefined || data.originalPrice === null || data.originalPrice === ""
                ? null
                : Number(data.originalPrice),
        images,
        category: typeof data.category === "object" && data.category?.name ? data.category.name : String(data.category).trim(),
        stock: data.stock === undefined || data.stock === "" ? 0 : Number(data.stock),
        badge: data.badge || "",
        isFeatured: Boolean(data.isFeatured),
        isActive: data.isActive === undefined ? true : Boolean(data.isActive),
    });
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
    if (!product) throw new AppError("Product not found", 404);
    return product;
};

exports.getSellerProducts = async (sellerId) => {
    return await Product.find({
        seller: sellerId,
    }).sort({ createdAt: -1 });
};

exports.getSellerProductById = async (id, sellerId, isAdmin) => {
    const product = await Product.findById(id);
    if (!product) throw new AppError("Product not found", 404);
    if (!isAdmin && String(product.seller) !== String(sellerId)) {
        throw new AppError("Not authorized to view this product", 403);
    }
    return product;
};

exports.updateProduct = async (id, sellerId, isAdmin, data) => {
    const product = await Product.findById(id);
    if (!product) throw new AppError("Product not found", 404);
    if (!isAdmin && String(product.seller) !== String(sellerId)) {
        throw new AppError("Not authorized to update this product", 403);
    }

    validatePayload(data, true);

    // Never allow ownership / rating counters to be overwritten from the client.
    const { seller, rating, reviews, _id, createdAt, updatedAt, __v, ...rest } = data;

    const update = { ...rest };

    if (update.name !== undefined) update.name = String(update.name).trim();
    if (update.description !== undefined) update.description = String(update.description).trim();
    if (update.price !== undefined) update.price = Number(update.price);
    if (update.originalPrice !== undefined) {
        update.originalPrice =
            update.originalPrice === null || update.originalPrice === "" ? null : Number(update.originalPrice);
    }
    if (update.stock !== undefined) update.stock = update.stock === "" ? 0 : Number(update.stock);
    if (update.category !== undefined && typeof update.category === "object") {
        update.category = update.category?.name ? String(update.category.name).trim() : product.category;
    } else if (update.category !== undefined) {
        update.category = String(update.category).trim();
    }
    if (update.images !== undefined) {
        const images = normalizeImages(update.images, update.name || product.name);
        if (images.length === 0) {
            throw new AppError("At least one product image URL is required", 400);
        }
        update.images = images;
    }
    if (update.badge !== undefined && update.badge === null) update.badge = "";
    if (update.isActive !== undefined) update.isActive = Boolean(update.isActive);
    if (update.isFeatured !== undefined) update.isFeatured = Boolean(update.isFeatured);

    return await Product.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
    });
};

exports.deleteProduct = async (id, sellerId, isAdmin) => {
    const product = await Product.findById(id);
    if (!product) throw new AppError("Product not found", 404);
    if (!isAdmin && String(product.seller) !== String(sellerId)) {
        throw new AppError("Not authorized to delete this product", 403);
    }
    await Product.findByIdAndDelete(id);
    return { success: true };
};
