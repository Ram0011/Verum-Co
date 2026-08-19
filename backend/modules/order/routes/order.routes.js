const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.post("/", authMiddleware, orderController.createOrder);

router.get("/my-orders", authMiddleware, orderController.getMyOrders);

module.exports = router;
