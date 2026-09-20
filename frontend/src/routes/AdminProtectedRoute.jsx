import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    // Wait for session verification — otherwise a fresh login /
    // page refresh renders with stale (null) user and bounces to "/".
    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!["admin"].includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
