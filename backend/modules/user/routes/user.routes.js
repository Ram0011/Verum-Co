const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

router.get("/me", authMiddleware, userController.getMe);

module.exports = router;
