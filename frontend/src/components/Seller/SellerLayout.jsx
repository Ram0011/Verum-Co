import { useState } from "react";
import { Outlet } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";
import SellerHeader from "./SellerHeader";

function SellerLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    function openMenu() {
        setMobileOpen(true);
    }

    function closeMenu() {
        setMobileOpen(false);
    }

    return (
        <div className="flex min-h-screen bg-[#f7f3ec] text-[#1B1B1F] antialiased">
            <SellerSidebar mobileOpen={mobileOpen} onClose={closeMenu} />

            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                <SellerHeader onMenu={openMenu} />

                {/* ambient wash behind content */}
                <div className="pointer-events-none relative">
                    <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#C9A15A]/[0.09] to-transparent" />
                </div>

                <main className="relative mx-auto w-full max-w-[1240px] min-w-0 flex-1 px-4 pb-16 pt-5 sm:px-6 sm:pt-7 lg:px-8">
                    <div>
                        <Outlet />
                    </div>
                </main>

                <footer className="border-t border-[#e7e0d3] bg-transparent">
                    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-1 px-4 py-5 text-[12px] text-[#969087] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                        <p>
                            <span className="font-serif font-semibold text-[#14171F]">
                                Verum &amp; Co.
                            </span>{" "}
                            — Seller Studio · Crafted for makers
                        </p>
                        <p className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            All systems operational
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default SellerLayout;
