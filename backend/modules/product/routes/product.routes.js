const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductsById);

module.exports = router;
