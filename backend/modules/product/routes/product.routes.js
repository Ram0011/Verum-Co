// const express = require("express");
// const router = express.Router();

// const productController = require("../controller/product.controller");
// const authMiddleware = require("../../../middleware/auth.middleware");
// const authorize = require("../../../middleware/role.middleware");

// router.post(
//     "/",
//     authMiddleware,
//     (req, res, next) => {
//         if (!["seller", "admin"].includes(req.user.role)) {
//             return res.status(403).json({
//                 success: "false",
//                 message: "Only Sellers and admin can create products",
//             });
//         }
//         next();
//     },
//     productController.createProduct,
// );

// router.get("/", productController.getProducts);

// // Static routes BEFORE param routes — otherwise "/seller"
// // is swallowed by "/:id" and "seller" gets cast to ObjectId.
// router.get(
//     "/seller",
//     authMiddleware,
//     authorize("seller"),
//     productController.getSellerProducts,
// );

// router.get("/:id", productController.getProductsById);

// module.exports = router;

const express = require("express");

const router = express.Router();

const productController = require("../controller/product.controller");

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductsById);

module.exports = router;
