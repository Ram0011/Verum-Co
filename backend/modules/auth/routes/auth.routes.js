const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");

// Customer registration
router.post("/register", authController.register);

// Customer login
router.post("/login", authController.login);

// Admin login
router.post("/admin/login", authController.adminLogin);

module.exports = router;
