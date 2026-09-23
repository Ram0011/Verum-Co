const express = require("express");
const router = express.Router();

const adminController = require("../controller/admin.controller");
const authMiddleware = require("../../../middleware/auth.middleware");
const authorize = require("../../../middleware/role.middleware");

// All admin routes require an authenticated admin user.
router.use(authMiddleware, authorize("admin"));

router.get("/stats", adminController.getStats);

router.get("/sellers", adminController.getSellers);
router.post("/sellers", adminController.createSeller);
router.delete("/sellers/:id", adminController.deleteSeller);

module.exports = router;
