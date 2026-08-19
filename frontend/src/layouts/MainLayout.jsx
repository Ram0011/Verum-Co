import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#f7f3ec]">
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
