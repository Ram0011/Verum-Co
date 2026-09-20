const express = require("express");

const router = express.Router();

const productController = require("../controller/product.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.use(authMiddleware);

// ========================================
// SELLER PRODUCT ACCESS
// ========================================

function allowSellerOrAdmin(req, res, next) {
    if (!["seller", "admin"].includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "Only sellers and admins can manage products",
        });
    }

    next();
}

router.get("/", allowSellerOrAdmin, productController.getSellerProducts);

// Single product for the edit page (ownership-checked).
router.get("/:id", allowSellerOrAdmin, productController.getSellerProductById);

router.post("/", allowSellerOrAdmin, productController.createProduct);

router.patch("/:id", allowSellerOrAdmin, productController.updateProduct);

router.delete("/:id", allowSellerOrAdmin, productController.deleteProduct);

module.exports = router;
