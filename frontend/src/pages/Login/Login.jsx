import { useState } from "react";
import { loginUser } from "@/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Note for production: move this @import into your global stylesheet /
// index.html <link> tag instead of injecting it at runtime on every mount.
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Public+Sans:wght@400;500;600;700&display=swap');`;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusField, setFocusField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (showError) setShowError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = await loginUser(formData);
            // console.log("DATA --------> ", data.user.role);
            login(data.user, data.token);
            // AuthContext.login() no longer navigates — route by role here.
            // An unconditional navigate("/") would override the admin flow.
            if (data.user?.role === "admin") {
                navigate("/admin", { replace: true });
            } else if (data.user?.role === "seller") {
                navigate("/seller", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch {
            setShowError(true);
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex bg-[#FAF6EF]"
            style={{ fontFamily: "'Public Sans', ui-sans-serif, sans-serif" }}
        >
            <style>{FONT_IMPORT}</style>

            {/* ---------------- Left editorial panel ---------------- */}
            <div className="hidden lg:flex lg:w-[44%] relative bg-[#14171F] overflow-hidden flex-col justify-between px-14 py-12">
                <div
                    className="absolute inset-0 opacity-[0.15] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(201,161,90,0.5) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#C9A15A]/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-16 w-72 h-72 rounded-full bg-[#C9A15A]/5 blur-3xl pointer-events-none" />

                {/* Wordmark */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-2">
                        <span
                            className="text-2xl tracking-tight text-[#FAF6EF]"
                            style={{
                                fontFamily: "'Fraunces', serif",
                                fontWeight: 600,
                            }}
                        >
                            Verum & Co.
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A15A] mt-1" />
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#8A8F9C] mt-1">
                        EST. ONLINE ATELIER
                    </p>
                </motion.div>

                {/* Signature: swinging price tag */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                    <motion.div
                        style={{ transformOrigin: "top center" }}
                        animate={{ rotate: [-6, 6, -6] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <svg
                            width="150"
                            height="210"
                            viewBox="0 0 150 210"
                            fill="none"
                        >
                            <line
                                x1="75"
                                y1="0"
                                x2="75"
                                y2="40"
                                stroke="#8A8F9C"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M75 40 L138 90 A10 10 0 0 1 140 104 L104 178 A14 14 0 0 1 84 184 L18 134 A10 10 0 0 1 14 120 L44 46 A10 10 0 0 1 56 40 Z"
                                fill="#1E2230"
                                stroke="#C9A15A"
                                strokeWidth="1.5"
                            />
                            <circle
                                cx="70"
                                cy="55"
                                r="5"
                                fill="none"
                                stroke="#C9A15A"
                                strokeWidth="1.5"
                            />
                            <text
                                x="75"
                                y="118"
                                textAnchor="middle"
                                fill="#C9A15A"
                                fontSize="15"
                                style={{
                                    fontFamily: "'Fraunces', serif",
                                    fontStyle: "italic",
                                }}
                                transform="rotate(18 75 118)"
                            >
                                Members
                            </text>
                            <text
                                x="75"
                                y="140"
                                textAnchor="middle"
                                fill="#FAF6EF"
                                fontSize="11"
                                letterSpacing="2"
                                transform="rotate(18 75 140)"
                            >
                                ONLY
                            </text>
                        </svg>
                    </motion.div>
                </div>

                {/* Tagline + stats */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative z-10"
                >
                    <p
                        className="text-3xl leading-tight text-[#FAF6EF]"
                        style={{
                            fontFamily: "'Fraunces', serif",
                            fontStyle: "italic",
                            fontWeight: 500,
                        }}
                    >
                        Curated goods,
                        <br />
                        delivered with care.
                    </p>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-[#8A8F9C]">
                        <span>24k Members</span>
                        <span className="w-1 h-1 rounded-full bg-[#8A8F9C]" />
                        <span>180 Countries</span>
                        <span className="w-1 h-1 rounded-full bg-[#8A8F9C]" />
                        <span>4.9 Rating</span>
                    </div>
                </motion.div>
            </div>

            {/* ---------------- Right form panel ---------------- */}
            <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="w-full max-w-sm"
                >
                    {/* Mobile brand bar */}
                    <div className="lg:hidden mb-10 flex items-center gap-2">
                        <span
                            className="text-xl text-[#1B1B1F]"
                            style={{
                                fontFamily: "'Fraunces', serif",
                                fontWeight: 600,
                            }}
                        >
                            Verum & Co.
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A15A] mt-0.5" />
                    </div>

                    <div className="mb-9">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-[#C9A15A]" />
                            <span className="text-[11px] uppercase tracking-[0.25em] text-[#A9803F] font-medium">
                                Member Access
                            </span>
                        </div>
                        <h1
                            className="text-4xl sm:text-[2.75rem] text-[#1B1B1F] leading-[1.1]"
                            style={{
                                fontFamily: "'Fraunces', serif",
                                fontWeight: 600,
                            }}
                        >
                            Welcome back
                        </h1>
                        <p className="text-[#6B6456] text-[15px] mt-3">
                            Sign in to pick up where you left off.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7"
                        noValidate
                    >
                        {/* Email */}
                        <div className="relative">
                            <label
                                htmlFor="email"
                                className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                                    focusField === "email" || formData.email
                                        ? "-top-4 text-[11px] tracking-wide text-[#A9803F]"
                                        : "top-2 text-[15px] text-[#8A8577]"
                                }`}
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusField("email")}
                                onBlur={() => setFocusField(null)}
                                required
                                className="w-full bg-transparent border-b border-[#DCD3BE] pt-2 pb-2.5 text-[15px] text-[#1B1B1F] focus:outline-none focus:border-[#14171F] transition-colors"
                            />
                            <motion.span
                                className="absolute bottom-0 left-0 h-[1.5px] bg-[#C9A15A]"
                                initial={{ width: "0%" }}
                                animate={{
                                    width:
                                        focusField === "email" ? "100%" : "0%",
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                                    focusField === "password" ||
                                    formData.password
                                        ? "-top-4 text-[11px] tracking-wide text-[#A9803F]"
                                        : "top-2 text-[15px] text-[#8A8577]"
                                }`}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => setFocusField("password")}
                                onBlur={() => setFocusField(null)}
                                required
                                className="w-full bg-transparent border-b border-[#DCD3BE] pt-2 pb-2.5 pr-8 text-[15px] text-[#1B1B1F] focus:outline-none focus:border-[#14171F] transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-0 bottom-2.5 text-[#8A8577] hover:text-[#1B1B1F] transition-colors"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                    >
                                        <path
                                            d="M17.94 17.94A10.94 10.94 0 0112 20c-6 0-10-6-10-8a17.7 17.7 0 014.22-4.94M9.9 4.24A10.87 10.87 0 0112 4c6 0 10 6 10 8a17.6 17.6 0 01-2.16 3.19M1 1l22 22"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                    >
                                        <path
                                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                            <motion.span
                                className="absolute bottom-0 left-0 h-[1.5px] bg-[#C9A15A]"
                                initial={{ width: "0%" }}
                                animate={{
                                    width:
                                        focusField === "password"
                                            ? "100%"
                                            : "0%",
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>

                        <AnimatePresence>
                            {showError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex items-center gap-2 bg-[#B3432B]/[0.08] border border-[#B3432B]/25 rounded-md px-3 py-2.5 overflow-hidden"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 20 20"
                                        fill="#B3432B"
                                        className="shrink-0"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 002 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-[13px] text-[#8A3221] font-medium">
                                        Incorrect email or password. Try again.
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-full bg-[#14171F] text-[#FAF6EF] font-medium text-[15px] py-3.5 mt-2 hover:bg-[#C9A15A] hover:text-[#14171F] transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            opacity="0.25"
                                        />
                                        <path
                                            d="M22 12a10 10 0 00-10-10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    Signing in
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </motion.button>

                        <p className="text-center text-[14px] text-[#6B6456] pt-2">
                            New to Verum & Co.?{" "}
                            <a
                                href="/register"
                                className="text-[#1B1B1F] font-medium underline decoration-[#C9A15A] decoration-2 underline-offset-4 hover:text-[#A9803F] transition-colors"
                            >
                                Create an account
                            </a>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
