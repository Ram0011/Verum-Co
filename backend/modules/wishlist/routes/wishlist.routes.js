const express = require("express");

const router = express.Router();

const wishlistController = require("../controller/wishlist.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.use(authMiddleware);

router.post("/:productId", wishlistController.addToWishlist);

router.get("/", wishlistController.getWishlist);

router.delete("/:productId", wishlistController.removeFromWishlist);

module.exports = router;
