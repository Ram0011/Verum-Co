import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SellerProtectedRoute = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    // Wait for session verification — otherwise a refresh with a valid
    // token but not-yet-loaded user bounces to "/" prematurely.
    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "seller") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default SellerProtectedRoute;
