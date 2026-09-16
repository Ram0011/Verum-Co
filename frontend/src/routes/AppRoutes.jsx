import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import RouteFallback from "@/components/loading/RouteFallback";
import ProtectedRoute from "./ProtectedRoutes";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Product = lazy(() => import("../pages/Product/Product"));
const Products = lazy(() => import("../pages/Products/Products"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));

// Scroll to top on every navigation — feels instant with the progress bar.
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);
    return null;
};

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback label="Loading" />}>
                <Routes>
                    {/* Storefront Routes */}
                    <Route element={<MainLayout />}>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />

                        <Route path="/product/:id" element={<Product />} />

                        <Route path="/products" element={<Products />} />

                        {/* Protected Routes */}
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>
                                    <Checkout />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute>
                                    <Orders />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/wishlist"
                            element={
                                <ProtectedRoute>
                                    <Wishlist />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default AppRoutes;
