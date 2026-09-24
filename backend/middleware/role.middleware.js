const AppError = require("../utils/AppError");

/**
 * Role-based authorization middleware factory.
 *
 * Must run AFTER auth.middleware (which sets req.user = { id, role }).
 *
 * Usage:
 *   const authorize = require("../../../middleware/role.middleware");
 *   router.post("/sellers", authMiddleware, authorize("admin"), controller.fn);
 *   router.post("/", authMiddleware, authorize("admin", "seller"), controller.fn);
 *   router.get("/", authMiddleware, authorize(["admin", "seller"]), controller.fn);
 */
const authorize = (...allowedRoles) => {
    // Support both authorize("admin", "seller") and authorize(["admin", "seller"])
    const roles =
        allowedRoles.length === 1 && Array.isArray(allowedRoles[0])
            ? allowedRoles[0]
            : allowedRoles;

    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Authentication required", 401));
        }

        // No roles specified -> any authenticated user may pass
        if (!roles || roles.length === 0) {
            return next();
        }

        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    `Access denied. Required role: ${roles.join(" or ")}`,
                    403,
                ),
            );
        }

        next();
    };
};

module.exports = authorize;
