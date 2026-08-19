import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import useWishlist from "@/hooks/useWishlist";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, user, logout } = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState("");

    const { cart, refetchCart } = useCart();

    const { wishlist, refetchWishlist } = useWishlist();

    /*
     * Refresh cart/wishlist when the user navigates.
     *
     * This is useful because an item can be added from
     * Product Details / Product Card and then the Navbar
     * should immediately reflect the new count.
     */
    useEffect(() => {
        if (!isAuthenticated) return;

        refetchCart?.();
        refetchWishlist?.();
    }, [isAuthenticated, location.pathname]);

    const cartCount =
        cart?.items?.reduce(
            (total, item) => total + Number(item.quantity || 0),
            0,
        ) || 0;

    const wishlistCount =
        wishlist?.items?.length || wishlist?.products?.length || 0;

    const handleSearch = (e) => {
        e.preventDefault();

        const value = search.trim();

        if (!value) {
            navigate("/products");
            setMobileOpen(false);
            return;
        }

        navigate(`/products?search=${encodeURIComponent(value)}&page=1`);

        setMobileOpen(false);
    };

    const handleLogout = () => {
        logout();

        setMobileOpen(false);

        navigate("/");
    };

    const navLinkClass = ({ isActive }) =>
        `relative text-sm font-medium transition-colors ${
            isActive ? "text-[#c99a3d]" : "text-[#45413b] hover:text-[#c99a3d]"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-[#ded8ce] bg-[#f7f3ec]/95 backdrop-blur">
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="flex h-20 items-center justify-between gap-8">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="shrink-0"
                        onClick={() => setMobileOpen(false)}
                    >
                        <div className="font-serif text-2xl font-semibold tracking-tight text-[#11151f]">
                            Verum & Co.
                            <span className="ml-1 text-[#c99a3d]">•</span>
                        </div>

                        <div className="mt-0.5 text-[8px] font-medium tracking-[0.28em] text-[#777168]">
                            EST. ONLINE ATELIER
                        </div>
                    </Link>

                    {/* Desktop Search */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden flex-1 md:block md:max-w-md"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f887e]" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search the collection..."
                                className="h-11 w-full rounded-none border border-[#d9d2c7] bg-transparent pl-11 pr-4 text-sm text-[#17191f] outline-none transition placeholder:text-[#969087] focus:border-[#c99a3d]"
                            />
                        </div>
                    </form>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-7 lg:flex">
                        <NavLink to="/" className={navLinkClass}>
                            Home
                        </NavLink>

                        <NavLink to="/products" className={navLinkClass}>
                            Shop
                        </NavLink>

                        {/* Wishlist */}
                        <NavLink
                            to="/wishlist"
                            className={({ isActive }) =>
                                `relative transition-colors ${
                                    isActive
                                        ? "text-[#c99a3d]"
                                        : "text-[#45413b] hover:text-[#c99a3d]"
                                }`
                            }
                            aria-label="Wishlist"
                        >
                            <Heart className="h-5 w-5" />

                            {isAuthenticated && wishlistCount > 0 && (
                                <span className="absolute -right-2.5 -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#11151f] px-1 text-[9px] font-semibold text-white">
                                    {wishlistCount > 99 ? "99+" : wishlistCount}
                                </span>
                            )}
                        </NavLink>

                        {/* Cart */}
                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `relative transition-colors ${
                                    isActive
                                        ? "text-[#c99a3d]"
                                        : "text-[#45413b] hover:text-[#c99a3d]"
                                }`
                            }
                            aria-label="Cart"
                        >
                            <ShoppingBag className="h-5 w-5" />

                            {isAuthenticated && cartCount > 0 && (
                                <span className="absolute -right-2.5 -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#11151f] px-1 text-[9px] font-semibold text-white">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </NavLink>

                        {/* Account */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <NavLink to="/orders" className={navLinkClass}>
                                    Orders
                                </NavLink>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-[#45413b] transition hover:text-[#a64b43]"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink to="/login" className={navLinkClass}>
                                <span className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Login
                                </span>
                            </NavLink>
                        )}
                    </nav>

                    {/* Mobile Menu */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen((value) => !value)}
                        className="rounded-full p-2 text-[#11151f] transition hover:bg-[#eee8de] lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="border-t border-[#ded8ce] py-5 lg:hidden">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="mb-5">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f887e]" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search the collection..."
                                    className="h-11 w-full rounded-none border border-[#d9d2c7] bg-transparent pl-11 pr-4 text-sm outline-none focus:border-[#c99a3d]"
                                />
                            </div>
                        </form>

                        <nav className="flex flex-col">
                            <NavLink
                                to="/"
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `border-b border-[#ded8ce] py-4 text-sm font-medium ${
                                        isActive
                                            ? "text-[#c99a3d]"
                                            : "text-[#45413b]"
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/products"
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `border-b border-[#ded8ce] py-4 text-sm font-medium ${
                                        isActive
                                            ? "text-[#c99a3d]"
                                            : "text-[#45413b]"
                                    }`
                                }
                            >
                                Shop
                            </NavLink>

                            {/* Wishlist */}
                            <NavLink
                                to="/wishlist"
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center justify-between border-b border-[#ded8ce] py-4 text-sm font-medium ${
                                        isActive
                                            ? "text-[#c99a3d]"
                                            : "text-[#45413b]"
                                    }`
                                }
                            >
                                <span className="flex items-center gap-3">
                                    <Heart className="h-4 w-4" />
                                    Wishlist
                                </span>

                                {isAuthenticated && wishlistCount > 0 && (
                                    <span className="text-xs text-[#8b857c]">
                                        {wishlistCount}
                                    </span>
                                )}
                            </NavLink>

                            {/* Cart */}
                            <NavLink
                                to="/cart"
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center justify-between border-b border-[#ded8ce] py-4 text-sm font-medium ${
                                        isActive
                                            ? "text-[#c99a3d]"
                                            : "text-[#45413b]"
                                    }`
                                }
                            >
                                <span className="flex items-center gap-3">
                                    <ShoppingBag className="h-4 w-4" />
                                    Cart
                                </span>

                                {isAuthenticated && cartCount > 0 && (
                                    <span className="text-xs text-[#8b857c]">
                                        {cartCount}
                                    </span>
                                )}
                            </NavLink>

                            {isAuthenticated ? (
                                <>
                                    <NavLink
                                        to="/orders"
                                        onClick={() => setMobileOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 border-b border-[#ded8ce] py-4 text-sm font-medium ${
                                                isActive
                                                    ? "text-[#c99a3d]"
                                                    : "text-[#45413b]"
                                            }`
                                        }
                                    >
                                        <User className="h-4 w-4" />
                                        Orders
                                    </NavLink>

                                    <div className="border-b border-[#ded8ce] py-4">
                                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b857c]">
                                            Signed in as
                                        </p>

                                        <p className="mt-1 truncate text-sm font-medium text-[#11151f]">
                                            {user?.name ||
                                                user?.email ||
                                                "Account"}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="py-4 text-left text-sm font-medium text-[#a64b43]"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 py-4 text-sm font-medium text-[#45413b]"
                                >
                                    <User className="h-4 w-4" />
                                    Login
                                </NavLink>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
