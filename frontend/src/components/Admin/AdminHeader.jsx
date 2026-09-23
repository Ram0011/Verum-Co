import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Menu,
    LogOut,
    Store,
    ChevronDown,
    ChevronRight,
    ShieldCheck,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

function getPageMeta(pathname) {
    if (pathname === "/admin/sellers") {
        return {
            title: "Sellers",
            crumb: "Team",
            sub: "Create seller accounts and manage access.",
        };
    }
    return {
        title: "Dashboard",
        crumb: "Overview",
        sub: "Welcome to the Verum & Co. admin panel.",
    };
}

function getInitials(name) {
    if (!name) return "A";
    const parts = name.split(" ");
    let out = "";
    for (let i = 0; i < parts.length && out.length < 2; i++) {
        if (parts[i]?.[0]) out += parts[i][0];
    }
    return (out || "A").toUpperCase();
}

function AdminHeader({ onMenu }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const meta = getPageMeta(location.pathname);
    const userName = user?.name || "Admin";
    const userEmail = user?.email || "admin@verum.co";

    function handleLogout() {
        setMenuOpen(false);
        logout();
        navigate("/admin/login", { replace: true });
    }

    return (
        <header className="sticky top-0 z-30 border-b border-[#e9e2d5] bg-[#f7f3ec]/80 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-[1240px] items-center gap-2.5 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={onMenu}
                    aria-label="Open admin menu"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e3ddd2] bg-white text-[#14171F] shadow-sm lg:hidden"
                >
                    <Menu size={19} />
                </button>

                <div className="min-w-0 flex-1">
                    <nav className="hidden items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#969087] sm:flex">
                        <span>Admin</span>
                        <ChevronRight size={12} />
                        <span className="text-[#C9A15A]">{meta.crumb}</span>
                    </nav>
                    <h1 className="truncate font-serif text-[20px] font-semibold leading-tight text-[#14171F] sm:text-[24px]">
                        {meta.title}
                    </h1>
                    <p className="hidden truncate text-[13px] text-[#6B6456] md:block">
                        {meta.sub}
                    </p>
                </div>

                <Link
                    to="/"
                    className="hidden h-10 shrink-0 items-center gap-2 rounded-full border border-[#14171F]/15 bg-white px-4 text-[13px] font-semibold text-[#14171F] shadow-sm sm:inline-flex"
                >
                    <Store size={15} className="text-[#C9A15A]" />
                    Store
                </Link>

                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="flex items-center gap-2 rounded-full border border-[#e3ddd2] bg-white py-1 pl-1 pr-2 shadow-sm sm:pr-3"
                    >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14171F] text-[12px] font-bold text-[#E3C37C]">
                            {getInitials(userName)}
                        </span>
                        <span className="hidden max-w-[120px] text-left leading-tight xl:block">
                            <span className="flex items-center gap-1 truncate text-[13px] font-semibold text-[#14171F]">
                                <span className="truncate">{userName}</span>
                                <ShieldCheck
                                    size={14}
                                    className="shrink-0 text-[#C9A15A]"
                                />
                            </span>
                            <span className="block truncate text-[11px] text-[#969087]">
                                Admin account
                            </span>
                        </span>
                        <ChevronDown
                            size={15}
                            className={`text-[#969087] transition-transform ${menuOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {menuOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setMenuOpen(false)}
                            />
                            <div className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-[#e3ddd2] bg-white shadow-xl">
                                <div className="border-b border-[#f0ebe1] bg-[#fbf9f4] p-4">
                                    <p className="truncate text-[14px] font-semibold text-[#14171F]">
                                        {userName}
                                    </p>
                                    <p className="truncate text-[12px] text-[#6B6456]">
                                        {userEmail}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
