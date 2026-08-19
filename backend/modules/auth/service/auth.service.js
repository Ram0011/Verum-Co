const User = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../../../utils/AppError");

exports.registerUser = async (data) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError("User already Exist", 400);

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return { _id: user._id, email: user.email, name: user.name };
};

exports.loginUser = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("Invalid Credentials (Email)", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid Password (Password)", 401);
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};
