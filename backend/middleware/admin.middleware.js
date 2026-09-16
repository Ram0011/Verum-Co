const AppError = require("../utils/AppError");

const adminOnly = (req, res, next) => {
    if (!req.user) {
        throw new AppError("Authentication Required ", 401);
    }

    if (!["admin", "super_admin"].includes(req.user.role)) {
        throw new AppError("Admin access Required", 403);
    }
    next();
};

module.exports = adminOnly;
