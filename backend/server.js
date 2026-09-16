const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error.middleware");
const authRoutes = require("./modules/auth/routes/auth.routes");
const productRoute = require("./modules/product/routes/product.routes");
const cartRoutes = require("./modules/cart/routes/cart.routes");
const orderRoutes = require("./modules/order/routes/order.routes");
const userRoutes = require("./modules/user/routes/user.routes");
const wishlistRoutes = require("./modules/wishlist/routes/wishlist.routes");

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//Connect DB
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/wishlist", wishlistRoutes);

//API TEST
app.get("/", (req, res) => {
    res.send("API running");
});

// Error handler — registered after the routes so it can catch their errors
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
