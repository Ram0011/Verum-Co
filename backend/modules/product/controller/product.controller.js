const productService = require("../service/product.service");

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct({
            ...req.body,
            seller: req.user.id || req.user._id,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Error in createProduct: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error ",
        });
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
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error ",
        });
    }
};
