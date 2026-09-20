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
