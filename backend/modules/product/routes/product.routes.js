const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    (req, res, next) => {
        if (!["seller", "admin", "super_admin"].includes(req.user.role)) {
            return res
                .status(403)
                .json({
                    success: "false",
                    message: "Only Sellers and admin can create products",
                });
        }
        next();
    },
    productController.createProduct,
);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductsById);

module.exports = router;
