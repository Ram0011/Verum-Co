import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { PageTransition } from "@/components/loading";

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen overflow-x-clip bg-[#f7f3ec]">
            <Navbar />

            <main className="min-w-0 overflow-x-clip">
                <PageTransition id={location.pathname}>
                    <Outlet />
                </PageTransition>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
