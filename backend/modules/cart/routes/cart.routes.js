const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.post("/", authMiddleware, cartController.addToCart);

router.get("/", authMiddleware, cartController.getCart);

router.delete("/:productId", authMiddleware, cartController.removeFromCart);

router.patch("/:productId", authMiddleware, cartController.updateCartQuantity);

module.exports = router;
