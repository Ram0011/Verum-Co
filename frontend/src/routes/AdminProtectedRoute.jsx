import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!["admin", "super_admin"].includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
