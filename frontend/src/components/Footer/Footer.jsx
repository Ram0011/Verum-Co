import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();

        const value = email.trim();

        if (!value) {
            toast.error("Please enter your email address.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        toast.success("You're on the list.");
        setEmail("");
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#11151f] text-[#f7f3ec]">
            {/* Newsletter / Brand Statement */}
            <div className="border-b border-white/10">
                <div className="mx-auto max-w-[1400px] px-6 py-14 sm:py-20 lg:px-10 lg:py-24">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                        {/* Statement */}
                        <div>
                            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                                <span className="h-px w-10 bg-[#c99a3d]" />
                                Stay in the know
                            </div>

                            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                                Good things,
                                <span className="block italic text-[#c99a3d]">
                                    worth knowing about.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-[#aaa7a0] sm:text-base">
                                Join our newsletter for new collections,
                                thoughtfully selected products and occasional
                                offers. No noise. Just the good stuff.
                            </p>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <form
                                onSubmit={handleSubscribe}
                                className="border-b border-white/30"
                            >
                                <div className="flex items-center gap-2">
                                    <Mail className="mr-4 h-5 w-5 shrink-0 text-[#c99a3d]" />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Your email address"
                                        aria-label="Email address"
                                        className="h-14 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#777a82]"
                                    />

                                    <button
                                        type="submit"
                                        className="group flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7f3ec] transition-colors hover:text-[#c99a3d] sm:text-xs"
                                    >
                                        Subscribe
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </button>
                                </div>
                            </form>

                            <p className="mt-4 text-xs leading-5 text-[#777a82]">
                                By subscribing, you agree to receive occasional
                                emails from Verum & Co.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div>
                <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
                    <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                        {/* Brand */}
                        <div>
                            <Link to="/" className="inline-block">
                                <div className="font-serif text-3xl font-semibold tracking-tight">
                                    Verum & Co.
                                    <span className="ml-1 text-[#c99a3d]">
                                        •
                                    </span>
                                </div>

                                <div className="mt-1 text-[8px] font-medium tracking-[0.3em] text-[#777a82]">
                                    EST. ONLINE ATELIER
                                </div>
                            </Link>

                            <p className="mt-7 max-w-sm text-sm leading-7 text-[#aaa7a0]">
                                A thoughtfully curated destination for products
                                that bring quality, character and simplicity
                                into everyday life.
                            </p>

                            {/* Location */}
                            <div className="mt-7 flex items-start gap-3 text-sm text-[#8d9097]">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c99a3d]" />

                                <span>
                                    Pune, Maharashtra
                                    <br />
                                    India
                                </span>
                            </div>

                            {/* Social */}
                            <div className="mt-8 flex items-center gap-3">
                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#aaa7a0] transition-all hover:border-[#c99a3d] hover:text-[#c99a3d]"
                                >
                                    <FaInstagram className="h-4 w-4" />
                                </a>

                                <a
                                    href="#"
                                    aria-label="Twitter"
                                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#aaa7a0] transition-all hover:border-[#c99a3d] hover:text-[#c99a3d]"
                                >
                                    <FaTwitter className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        {/* Shop */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f3ec]">
                                Shop
                            </h3>

                            <nav className="mt-6 flex flex-col gap-4">
                                <Link
                                    to="/products"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    All Products
                                </Link>

                                <Link
                                    to="/products?category=Electronics"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Electronics
                                </Link>

                                <Link
                                    to="/products?category=Fashion"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Fashion
                                </Link>

                                <Link
                                    to="/products?category=Home"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Home
                                </Link>
                            </nav>
                        </div>

                        {/* Account */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f3ec]">
                                Account
                            </h3>

                            <nav className="mt-6 flex flex-col gap-4">
                                <Link
                                    to="/login"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    to="/register"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Create Account
                                </Link>

                                <Link
                                    to="/wishlist"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Wishlist
                                </Link>

                                <Link
                                    to="/orders"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Order History
                                </Link>
                            </nav>
                        </div>

                        {/* Help */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f3ec]">
                                Help
                            </h3>

                            <nav className="mt-6 flex flex-col gap-4">
                                <a
                                    href="mailto:support@verumco.com"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Contact Us
                                </a>

                                <a
                                    href="#"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Shipping & Delivery
                                </a>

                                <a
                                    href="#"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    Returns & Refunds
                                </a>

                                <a
                                    href="#"
                                    className="text-sm text-[#8d9097] transition-colors hover:text-[#c99a3d]"
                                >
                                    FAQs
                                </a>
                            </nav>
                        </div>
                    </div>

                    {/* Trust Strip */}
                    <div className="mt-16 grid border-y border-white/10 py-7 sm:grid-cols-3">
                        <div className="border-b border-white/10 pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f7f3ec]">
                                Secure Payments
                            </p>

                            <p className="mt-2 text-xs text-[#777a82]">
                                Safe and encrypted checkout
                            </p>
                        </div>

                        <div className="border-b border-white/10 py-5 sm:border-b-0 sm:border-r sm:px-8 sm:py-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f7f3ec]">
                                Authentic Products
                            </p>

                            <p className="mt-2 text-xs text-[#777a82]">
                                Every product carefully verified
                            </p>
                        </div>

                        <div className="pt-5 sm:pl-8 sm:pt-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f7f3ec]">
                                Customer Support
                            </p>

                            <p className="mt-2 text-xs text-[#777a82]">
                                We're here when you need us
                            </p>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex flex-col gap-5 pt-8 text-xs text-[#777a82] sm:flex-row sm:items-center sm:justify-between">
                        <p>© {currentYear} Verum & Co. All rights reserved.</p>

                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                            <a
                                href="#"
                                className="transition-colors hover:text-[#c99a3d]"
                            >
                                Privacy Policy
                            </a>

                            <a
                                href="#"
                                className="transition-colors hover:text-[#c99a3d]"
                            >
                                Terms of Service
                            </a>

                            <a
                                href="#"
                                className="transition-colors hover:text-[#c99a3d]"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
