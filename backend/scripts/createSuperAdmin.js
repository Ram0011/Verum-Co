require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const User = require("../modules/auth/model/auth.model");

const createSuperAdmin = async () => {
    try {
        await connectDB();

        const email = "superadmin@verumco.com";
        const password = "SuperAdmin@123";
        const name = "Super Admin";

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("Super Admin already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "super_admin",
        });

        console.log("Super Admin created successfully!");
        console.log("Email:", user.email);
        console.log("Role:", user.role);

        process.exit(0);
    } catch (error) {
        console.error("Error creating Super Admin:", error);
        process.exit(1);
    }
};

createSuperAdmin();
