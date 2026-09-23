import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "@/components/Admin/AdminLayout";
import RouteFallback from "@/components/loading/RouteFallback";

const AdminLogin = lazy(() => import("@/pages/Admin/AdminLogin/AdminLogin"));
const AdminDashboard = lazy(
    () => import("@/pages/Admin/Dashboard/AdminDashboard"),
);
const AdminSellers = lazy(() => import("@/pages/Admin/Sellers/AdminSellers"));

const AdminRoutes = () => {
    return (
        <Suspense fallback={<RouteFallback label="Loading admin" />}>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route
                    path="/admin"
                    element={
                        <AdminProtectedRoute>
                            <AdminLayout />
                        </AdminProtectedRoute>
                    }
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="sellers" element={<AdminSellers />} />
                    <Route
                        path="*"
                        element={<Navigate to="/admin" replace />}
                    />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;
