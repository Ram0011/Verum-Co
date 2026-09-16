import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import AdminProtectedRoute from "./AdminProtectedRoute";
import RouteFallback from "@/components/loading/RouteFallback";

const AdminLogin = lazy(() => import("@/pages/Admin/AdminLogin/AdminLogin"));
const AdminDashboard = lazy(
    () => import("@/pages/Admin/Dashboard/AdminDashboard"),
);

const AdminRoutes = () => {
    return (
        <Suspense fallback={<RouteFallback label="Loading admin" />}>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route
                    path="/admin"
                    element={
                        <AdminProtectedRoute>
                            <AdminDashboard />
                        </AdminProtectedRoute>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;
