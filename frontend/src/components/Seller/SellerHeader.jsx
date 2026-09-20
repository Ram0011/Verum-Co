import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Menu,
    Search,
    Bell,
    ChevronDown,
    ChevronRight,
    LogOut,
    Store,
    BadgeCheck,
    Command,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

// simple function to get title for each page
function getPageMeta(pathname) {
    if (pathname === "/seller") {
        return {
            title: "Dashboard",
            crumb: "Overview",
            sub: "Here's how your store is performing today.",
        };
    }
    if (pathname === "/seller/products") {
        return {
            title: "Products",
            crumb: "Catalog",
            sub: "Manage, edit and organise your listings.",
        };
    }
    if (pathname === "/seller/products/create") {
        return {
            title: "Add Product",
            crumb: "Catalog",
            sub: "List something beautiful in under a minute.",
        };
    }
    if (pathname === "/seller/inventory") {
        return {
            title: "Inventory",
            crumb: "Catalog",
            sub: "Stock levels and availability.",
        };
    }
    if (pathname === "/seller/orders") {
        return {
            title: "Orders",
            crumb: "Sales",
            sub: "Fulfil orders and keep buyers happy.",
        };
    }
    if (pathname.includes("/edit")) {
        return {
            title: "Edit Product",
            crumb: "Catalog",
            sub: "Refine your listing details.",
        };
    }
    return {
        title: "Seller Studio",
        crumb: "Overview",
        sub: "Welcome back to your studio.",
    };
}

// get short letters from name, like "John Doe" -> "JD"
function getInitials(name) {
    if (!name) {
        return "S";
    }
    const parts = name.split(" ");
    let result = "";
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] && parts[i][0]) {
            result = result + parts[i][0];
        }
        if (result.length >= 2) {
            break;
        }
    }
    if (result === "") {
        return "S";
    }
    return result.toUpperCase();
}

function SellerHeader(props) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const pathname = location.pathname;
    const meta = getPageMeta(pathname);

    let userName = "Seller";
    if (user && user.name) {
        userName = user.name;
    }
    let userEmail = "seller@verum.co";
    if (user && user.email) {
        userEmail = user.email;
    }
    let userRole = "seller";
    if (user && user.role) {
        userRole = user.role;
    }

    // change header shadow when page is scrolled
    useEffect(function () {
        function onScroll() {
            if (window.scrollY > 8) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        onScroll();
        window.addEventListener("scroll", onScroll);
        return function () {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    function handleMenuBtn() {
        if (props.onMenu) {
            props.onMenu();
        }
    }

    function toggleMenu() {
        if (menuOpen === true) {
            setMenuOpen(false);
        } else {
            setMenuOpen(true);
        }
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    function handleLogout() {
        setMenuOpen(false);
        logout();
        navigate("/login");
    }

    let headerClass = "border-b border-[#e9e2d5] bg-[#f7f3ec]/70 backdrop-blur-md";
    if (scrolled === true) {
        headerClass =
            "border-b border-[#e3ddd2] bg-[#fbf9f4]/85 shadow-[0_12px_32px_-20px_rgba(20,23,31,0.35)] backdrop-blur-xl";
    }

    let profileBtnClass = "border-[#e3ddd2] hover:border-[#C9A15A]/60";
    if (menuOpen === true) {
        profileBtnClass = "border-[#C9A15A] ring-4 ring-[#C9A15A]/15";
    }

    let arrowClass = "text-[#969087] transition-transform duration-300";
    if (menuOpen === true) {
        arrowClass = "text-[#969087] transition-transform duration-300 rotate-180";
    }

    return (
        <header className={`sticky top-0 z-30 transition-all duration-300 ${headerClass}`}>
            <div className="mx-auto flex w-full max-w-[1240px] items-center gap-2.5 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
                {/* Hamburger */}
                <button
                    type="button"
                    onClick={handleMenuBtn}
                    aria-label="Open seller menu"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e3ddd2] bg-white text-[#14171F] shadow-sm transition-all hover:border-[#C9A15A] hover:shadow-md active:scale-95 lg:hidden"
                >
                    <Menu size={19} />
                </button>

                {/* Title block */}
                <div className="min-w-0 flex-1">
                    <nav
                        aria-label="Breadcrumb"
                        className="hidden items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#969087] sm:flex"
                    >
                        <span>Seller</span>
                        <ChevronRight size={12} />
                        <span className="text-[#C9A15A]">{meta.crumb}</span>
                    </nav>
                    <h1 className="truncate font-serif text-[20px] font-semibold leading-tight text-[#14171F] sm:mt-0.5 sm:text-[24px]">
                        {meta.title}
                    </h1>
                    <p className="hidden truncate text-[13px] text-[#6B6456] md:block">
                        {meta.sub}
                    </p>
                </div>

                {/* Search — desktop */}
                <div className="group relative hidden w-56 shrink-0 md:block xl:w-72">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#969087] transition-colors group-focus-within:text-[#C9A15A]"
                    />
                    <input
                        type="search"
                        placeholder="Search products, orders…"
                        className="h-10 w-full rounded-full border border-[#e3ddd2] bg-white/80 pl-10 pr-12 text-[13px] text-[#14171F] shadow-sm outline-none transition-all placeholder:text-[#969087] focus:border-[#C9A15A] focus:bg-white focus:ring-4 focus:ring-[#C9A15A]/15"
                    />
                    <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-[#e3ddd2] bg-[#f7f3ec] px-1.5 py-0.5 text-[10px] font-semibold text-[#969087] lg:flex">
                        <Command size={11} />K
                    </kbd>
                </div>

                {/* View store */}
                <Link
                    to="/"
                    className="verum-btn-shine relative hidden h-10 shrink-0 items-center gap-2 overflow-hidden rounded-full border border-[#14171F]/15 bg-white px-4 text-[13px] font-semibold text-[#14171F] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#14171F] hover:shadow-md sm:inline-flex"
                >
                    <Store size={15} className="text-[#C9A15A]" />
                    Store
                </Link>

                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e3ddd2] bg-white text-[#14171F] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C9A15A] hover:shadow-md active:scale-95"
                >
                    <Bell size={17} />
                    <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A15A] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C9A15A] ring-2 ring-white" />
                    </span>
                </button>

                {/* Profile */}
                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className={`flex items-center gap-2 rounded-full border bg-white py-1 pl-1 pr-2 shadow-sm transition-all hover:shadow-md active:scale-[0.98] sm:pr-3 ${profileBtnClass}`}
                    >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#14171F] to-[#3a3f4d] text-[12px] font-bold text-[#E3C37C]">
                            {getInitials(userName)}
                        </span>
                        <span className="hidden max-w-[120px] text-left leading-tight xl:block">
                            <span className="flex items-center gap-1 truncate text-[13px] font-semibold text-[#14171F]">
                                <span className="truncate">{userName}</span>
                                <BadgeCheck size={14} className="shrink-0 text-[#C9A15A]" />
                            </span>
                            <span className="block truncate text-[11px] capitalize text-[#969087]">
                                {userRole} account
                            </span>
                        </span>
                        <ChevronDown size={15} className={arrowClass} />
                    </button>

                    {menuOpen === true && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={closeMenu} />
                            <div className="absolute right-0 z-20 mt-2 w-60 origin-top-right overflow-hidden rounded-2xl border border-[#e3ddd2] bg-white shadow-[0_24px_60px_-16px_rgba(20,23,31,0.35)]">
                                <div className="border-b border-[#f0ebe1] bg-[#fbf9f4] p-4">
                                    <p className="truncate text-[14px] font-semibold text-[#14171F]">
                                        {userName}
                                    </p>
                                    <p className="truncate text-[12px] text-[#6B6456]">{userEmail}</p>
                                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#C9A15A]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8a6a2a] ring-1 ring-[#C9A15A]/30">
                                        <BadgeCheck size={12} />
                                        Verified seller
                                    </span>
                                </div>
                                <div className="p-2">
                                    <Link
                                        to="/"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#3a3f4d] transition-colors hover:bg-[#f7f3ec]"
                                    >
                                        <Store size={16} className="text-[#C9A15A]" />
                                        View storefront
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-red-600 transition-colors hover:bg-red-50"
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

            {/* Mobile search */}
            <div className="px-4 pb-3 md:hidden">
                <div className="group relative">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#969087]"
                    />
                    <input
                        type="search"
                        placeholder="Search products, orders…"
                        className="h-10 w-full rounded-xl border border-[#e3ddd2] bg-white pl-10 pr-4 text-[13px] shadow-sm outline-none placeholder:text-[#969087] focus:border-[#C9A15A] focus:ring-4 focus:ring-[#C9A15A]/15"
                    />
                </div>
            </div>
        </header>
    );
}

export default SellerHeader;
