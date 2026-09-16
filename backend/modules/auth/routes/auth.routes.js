const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/admin/login", authController.adminLogin);
router.post(
    "/staff",
    authMiddleware,
    (req, res, next) => {
        if (req.user.role !== "super_admin") {
            return res.status(403).json({
                success: false,
                message: "Only Super Admin can create staff accounts",
            });
        }

        next();
    },
    authController.createStaffUser,
);

module.exports = router;
