import { useLocation } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import AppRoutes from "./AppRoutes";

const RootRoutes = () => {
    const { pathname } = useLocation();

    if (pathname.startsWith("/admin")) {
        return <AdminRoutes />;
    }

    return <AppRoutes />;
};

export default RootRoutes;
