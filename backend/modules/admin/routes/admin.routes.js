const express = require("express");
const router = express.Router();

const adminController = require("../controller/admin.controller");
const authMiddleware = require("../../../middleware/auth.middleware");
const authorize = require("../../../middleware/role.middleware");

router.post(
    "/sellers",
    authMiddleware,
    authorize("admin"),
    adminController.createSeller,
);

module.exports = router;
