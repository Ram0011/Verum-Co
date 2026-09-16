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
            role: user.role,
        },
        token,
    };
};

exports.loginUser = async (data, allowedRoles = null) => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("Invalid Credentials (Email)", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid Password (Password)", 401);
    }

    if (
        Array.isArray(allowedRoles) &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        throw new AppError("Access denied. Admins only.", 403);
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
            role: user.role,
        },
        token,
    };
};

exports.createStaffUser = async (data) => {
    const { name, email, password, role } = data;

    if (!["seller", "admin"].includes(role)) {
        throw new AppError("Invalid staff role", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
