// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import { registerUser } from "@/api/auth.api";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";

// const Register = () => {
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     const [showSuccess, setShowSuccess] = useState(false);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = await registerUser(formData);
//             login(data.user, data.token);
//             navigate("/");
//             setShowSuccess(true);
//         } catch (_error) {
//             console.log("Error in Register: ", _error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 overflow-hidden relative">
//             {/* Animated background circles */}
//             <div className="absolute -inset-0 overflow-hidden pointer-events-none">
//                 <motion.div
//                     className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20 -top-5 -left-10"
//                     animate="visible"
//                     transition={{ duration: 6, ease: "ease-in-out" }}
//                 />
//                 <motion.div
//                     className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-20 -bottom-10 -right-10"
//                     animate="visible"
//                     transition={{ duration: 8, ease: "ease-in-out" }}
//                 />
//             </div>

//             {/* Decorative left element */}
//             <motion.div
//                 className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-30"
//                 animate="visible"
//                 transition={{ duration: 4, delay: 0.5, ease: "ease-in-out" }}
//                 style={{
//                     background:
//                         "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent)",
//                 }}
//             >
//                 <svg
//                     className="w-full h-full fill-none stroke-white/20 stroke-width"
//                     viewBox="0 0 100 100"
//                 >
//                     <circle
//                         cx="50"
//                         cy="50"
//                         r="45"
//                         fill="none"
//                         strokeWidth="1"
//                     />
//                 </svg>
//             </motion.div>

//             <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
//                 <motion.div
//                     className="w-full max-w-md w-full px-6 py-8 bg-white/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20"
//                     animate="visible"
//                     transition={{ type: "spring", damping: 20, stiffness: 150 }}
//                 >
//                     <div className="text-center">
//                         <h1
//                             className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
//                             initial="hidden"
//                             animate="visible"
//                             transition={{ delay: 0.2 }}
//                         >
//                             Create Account
//                         </h1>

//                         <p
//                             className="text-slate-600 text-sm mb-8 max-w-sm"
//                             initial="hidden"
//                             animate="visible"
//                             transition={{ delay: 0.3 }}
//                         >
//                             Sign up to join our community of savvy shoppers
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-600 mb-2">
//                                 Name
//                             </label>
//                             <Input
//                                 name="name"
//                                 placeholder="Enter your name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-slate-600 mb-2">
//                                 Email address
//                             </label>
//                             <Input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-slate-600 mb-2">
//                                 Password
//                             </label>
//                             <Input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white font-medium text-sm hover:bg-indigo-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
//                         >
//                             Register
//                         </button>

//                         {showSuccess && (
//                             <div className="bg-green-100/50 border-green-200/50 border rounded-xl p-6 mb-8 text-center">
//                                 <svg
//                                     className="h-12 w-12 mx-auto mb-3 text-green-400"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 5a5 5 0 100-10 5 5 0 000 10z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 <h3 className="text-xl font-bold text-slate-900 mb-2">
//                                     Account Created!
//                                 </h3>
//                                 <p className="text-slate-600">
//                                     Your account has been successfully created.
//                                     Welcome to Verum & Co.!
//                                 </p>
//                             </div>
//                         )}

//                         <div className="text-center mt-6">
//                             <p className="text-sm text-slate-500">
//                                 Already have an account?
//                                 <a
//                                     href="/login"
//                                     className="font-medium text-indigo-600 hover:text-pink-500 transition-colors"
//                                 >
//                                     Login
//                                 </a>
//                             </p>
//                         </div>
//                     </form>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { registerUser } from "@/api/auth.api";
import { motion, AnimatePresence } from "framer-motion";

// Note for production: move this @import into your global stylesheet /
// index.html <link> tag instead of injecting it at runtime on every mount.
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Public+Sans:wght@400;500;600;700&display=swap');`;

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusField, setFocusField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = await registerUser(formData);
            login(data.user, data.token);
            setShowSuccess(true);
            setTimeout(() => navigate("/"), 1100);
        } catch (_error) {
            console.log("Error in Register: ", _error);
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
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[#C9A15A]/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-[#C9A15A]/5 blur-3xl pointer-events-none" />

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
                        Est. Online Boutique
                    </p>
                </motion.div>

                {/* Signature: swinging price tag */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                    <motion.div
                        style={{ transformOrigin: "top center" }}
                        animate={{ rotate: [6, -6, 6] }}
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
                                Welcome
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
                                NEW
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
                        Join the list,
                        <br />
                        shop the drop first.
                    </p>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-[#8A8F9C]">
                        <span>Free Shipping</span>
                        <span className="w-1 h-1 rounded-full bg-[#8A8F9C]" />
                        <span>Member Pricing</span>
                        <span className="w-1 h-1 rounded-full bg-[#8A8F9C]" />
                        <span>Early Access</span>
                    </div>
                </motion.div>
            </div>

            {/* ---------------- Right form panel ---------------- */}
            <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-10">
                <div className="w-full max-w-sm">
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

                    <AnimatePresence mode="wait">
                        {showSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="py-10"
                            >
                                <motion.div
                                    initial={{ scale: 0.6, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 14,
                                        delay: 0.1,
                                    }}
                                    className="w-14 h-14 rounded-full bg-[#3C6E58]/10 border border-[#3C6E58]/25 flex items-center justify-center mb-6"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#3C6E58"
                                        strokeWidth="2.2"
                                    >
                                        <path
                                            d="M5 13l4 4L19 7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </motion.div>
                                <h1
                                    className="text-3xl text-[#1B1B1F] leading-[1.1] mb-2"
                                    style={{
                                        fontFamily: "'Fraunces', serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    Account created
                                </h1>
                                <p className="text-[#6B6456] text-[15px]">
                                    Welcome to Verum & Co.
                                    {formData.name
                                        ? `, ${formData.name.split(" ")[0]}`
                                        : ""}
                                    . Taking you inside…
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                            >
                                <div className="mb-9">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="h-px w-8 bg-[#C9A15A]" />
                                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#A9803F] font-medium">
                                            New Member
                                        </span>
                                    </div>
                                    <h1
                                        className="text-4xl sm:text-[2.75rem] text-[#1B1B1F] leading-[1.1]"
                                        style={{
                                            fontFamily: "'Fraunces', serif",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Create your account
                                    </h1>
                                    <p className="text-[#6B6456] text-[15px] mt-3">
                                        Join Verum & Co. for curated drops and
                                        member pricing.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-7"
                                    noValidate
                                >
                                    {/* Name */}
                                    <div className="relative">
                                        <label
                                            htmlFor="name"
                                            className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                                                focusField === "name" ||
                                                formData.name
                                                    ? "-top-4 text-[11px] tracking-wide text-[#A9803F]"
                                                    : "top-2 text-[15px] text-[#8A8577]"
                                            }`}
                                        >
                                            Full name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusField("name")
                                            }
                                            onBlur={() => setFocusField(null)}
                                            required
                                            className="w-full bg-transparent border-b border-[#DCD3BE] pt-2 pb-2.5 text-[15px] text-[#1B1B1F] focus:outline-none focus:border-[#14171F] transition-colors"
                                        />
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-[1.5px] bg-[#C9A15A]"
                                            initial={{ width: "0%" }}
                                            animate={{
                                                width:
                                                    focusField === "name"
                                                        ? "100%"
                                                        : "0%",
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                            }}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <label
                                            htmlFor="email"
                                            className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                                                focusField === "email" ||
                                                formData.email
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
                                            onFocus={() =>
                                                setFocusField("email")
                                            }
                                            onBlur={() => setFocusField(null)}
                                            required
                                            className="w-full bg-transparent border-b border-[#DCD3BE] pt-2 pb-2.5 text-[15px] text-[#1B1B1F] focus:outline-none focus:border-[#14171F] transition-colors"
                                        />
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-[1.5px] bg-[#C9A15A]"
                                            initial={{ width: "0%" }}
                                            animate={{
                                                width:
                                                    focusField === "email"
                                                        ? "100%"
                                                        : "0%",
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                            }}
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
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusField("password")
                                            }
                                            onBlur={() => setFocusField(null)}
                                            required
                                            className="w-full bg-transparent border-b border-[#DCD3BE] pt-2 pb-2.5 pr-8 text-[15px] text-[#1B1B1F] focus:outline-none focus:border-[#14171F] transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((s) => !s)
                                            }
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
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                            }}
                                        />
                                        <p className="text-[11px] text-[#9A9484] mt-2">
                                            Use at least 8 characters, mixing
                                            letters and numbers.
                                        </p>
                                    </div>

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
                                                Creating account
                                            </>
                                        ) : (
                                            "Create account"
                                        )}
                                    </motion.button>

                                    <p className="text-center text-[14px] text-[#6B6456] pt-2">
                                        Already have an account?{" "}
                                        <a
                                            href="/login"
                                            className="text-[#1B1B1F] font-medium underline decoration-[#C9A15A] decoration-2 underline-offset-4 hover:text-[#A9803F] transition-colors"
                                        >
                                            Sign in
                                        </a>
                                    </p>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Register;
