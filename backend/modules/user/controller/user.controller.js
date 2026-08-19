const AppError = require("../../../utils/AppError");
const userService = require("../service/user.service");

exports.getMe = async (req, res, next) => {
    try {
        const response = await userService.getMe(req.user.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};
