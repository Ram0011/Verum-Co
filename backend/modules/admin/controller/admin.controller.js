const adminService = require("../service/admin.service");

exports.createSeller = async (req, res, next) => {
    try {
        const seller = await adminService.createSeller(req.body);

        res.status(201).json({
            success: true,
            message: "Seller created successfully",
            seller,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSellers = async (req, res, next) => {
    try {
        const { sellers, total } = await adminService.getSellers(req.query);

        res.status(200).json({
            success: true,
            total,
            sellers,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSeller = async (req, res, next) => {
    try {
        const deleted = await adminService.deleteSeller(req.params.id);

        res.status(200).json({
            success: true,
            message: "Seller deleted successfully",
            deleted,
        });
    } catch (error) {
        next(error);
    }
};

exports.getStats = async (req, res, next) => {
    try {
        const stats = await adminService.getStats();

        res.status(200).json({
            success: true,
            stats,
        });
    } catch (error) {
        next(error);
    }
};
