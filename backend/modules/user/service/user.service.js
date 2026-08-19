const AppError = require("../../../utils/AppError");
const User = require("../../auth/model/auth.model");

exports.getMe = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("[user service]: User not found! ", 404);
    }
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
