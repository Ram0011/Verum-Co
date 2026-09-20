const User = require("../../auth/model/auth.model");
const bcrypt = require("bcryptjs");
const AppError = require("../../../utils/AppError");

exports.createSeller = async (data) => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new AppError("Name, email and password are required", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "seller",
    });

    return {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
    };
};
