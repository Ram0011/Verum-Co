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

exports.getSellers = async (query = {}) => {
    const { search = "" } = query;

    const filter = { role: "seller" };
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    const sellers = await User.find(filter)
        .select("_id name email role createdAt")
        .sort({ createdAt: -1 })
        .lean();

    return { sellers, total: sellers.length };
};

exports.deleteSeller = async (id) => {
    if (!id) {
        throw new AppError("Seller id is required", 400);
    }

    const seller = await User.findById(id);

    if (!seller) {
        throw new AppError("Seller not found", 404);
    }

    if (seller.role !== "seller") {
        throw new AppError("Only sellers can be deleted via this route", 400);
    }

    await User.findByIdAndDelete(id);

    // Clean up the seller's products so orphan listings don't linger.
    try {
        const Product = require("../../product/model/product.model");
        await Product.deleteMany({ seller: id });
    } catch {
        // Product cleanup is best-effort — seller is already deleted.
    }

    return { _id: seller._id, email: seller.email };
};

exports.getStats = async () => {
    const [sellerCount, customerCount, adminCount] = await Promise.all([
        User.countDocuments({ role: "seller" }),
        User.countDocuments({ role: "customer" }),
        User.countDocuments({ role: "admin" }),
    ]);

    let productCount = 0;
    try {
        const Product = require("../../product/model/product.model");
        productCount = await Product.countDocuments();
    } catch {
        productCount = 0;
    }

    return { sellerCount, customerCount, adminCount, productCount };
};
