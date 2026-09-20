const productService = require("../service/product.service");

function sellerIdOf(user) {
    return user.id || user._id;
}

exports.createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct({
            ...req.body,
            seller: sellerIdOf(req.user),
        });
        res.status(201).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const data = await productService.getProducts(req.query);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getProducts: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error ",
        });
    }
};

exports.getProductsById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error in getProducts: ", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error ",
        });
    }
};

exports.getSellerProducts = async (req, res, next) => {
    try {
        const products = await productService.getSellerProducts(sellerIdOf(req.user));

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSellerProductById = async (req, res, next) => {
    try {
        const product = await productService.getSellerProductById(
            req.params.id,
            sellerIdOf(req.user),
            req.user.role === "admin",
        );
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            sellerIdOf(req.user),
            req.user.role === "admin",
            req.body,
        );
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(
            req.params.id,
            sellerIdOf(req.user),
            req.user.role === "admin",
        );
        res.status(200).json({
            success: true,
            message: "Product deleted",
        });
    } catch (error) {
        next(error);
    }
};
