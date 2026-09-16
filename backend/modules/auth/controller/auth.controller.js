const authService = require("../service/auth.service");

exports.register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await authService.loginUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.adminLogin = async (req, res, next) => {
    try {
        const user = await authService.loginUser(req.body, [
            "admin",
            "super_admin",
        ]);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.createStaffUser = async (req, res, next) => {
    try {
        const user = await authService.createStaffUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};
