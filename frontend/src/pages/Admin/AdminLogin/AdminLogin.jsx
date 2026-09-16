import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { loginAdmin } from "@/api/auth.api";
import { ButtonLoader } from "@/components/loading";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Backend enforces admin/super_admin-only access.
            // Non-admin credentials get 403 and no token is issued.
            const response = await loginAdmin({
                email,
                password,
            });

            const { user, token } = response;

            // Defense-in-depth: never store a non-admin session from here.
            if (!["admin", "super_admin"].includes(user.role)) {
                toast.error("You do not have admin access.");
                return;
            }

            login(user, token);

            toast.success("Welcome to the admin panel");

            navigate("/admin");
        } catch (error) {
            console.error(error);

            toast.error(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full font-['Georgia',_serif]">
            {/* LEFT — dark atelier panel */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#12131c] px-14 py-12 lg:flex">
                {/* faint dot texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#c9a24b 0.8px, transparent 0.8px)",
                        backgroundSize: "26px 26px",
                    }}
                />

                {/* top wordmark */}
                <div className="relative z-10">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold tracking-tight text-[#f5efe4]">
                            Verum &amp; Co.
                        </h2>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]" />
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-[#8b8d99]">
                        Est. Online Atelier
                    </p>
                </div>

                {/* signature tag */}
                <div className="relative z-10 flex flex-1 items-center justify-center">
                    <div className="relative -rotate-6">
                        <div className="mx-auto h-14 w-px bg-[#4a4c5c]" />
                        <div className="flex h-40 w-36 -translate-y-1 flex-col items-center justify-center gap-1 rounded-xl border border-[#c9a24b]/70 bg-[#181924]">
                            <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-[#c9a24b]/70" />
                            <p className="font-['Georgia',_serif] text-lg italic text-[#c9a24b]">
                                Members
                            </p>
                            <p className="text-sm font-semibold tracking-[0.2em] text-[#f5efe4]">
                                ONLY
                            </p>
                        </div>
                    </div>
                </div>

                {/* bottom copy + stats */}
                <div className="relative z-10">
                    <p className="font-['Georgia',_serif] text-3xl italic leading-snug text-[#f5efe4]">
                        Curated access,
                        <br />
                        guarded with care.
                    </p>

                    <div className="mt-10 flex items-center gap-3 border-t border-[#2c2e3a] pt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8b8d99]">
                        <span>Admin Only</span>
                        <span className="h-1 w-1 rounded-full bg-[#8b8d99]" />
                        <span>Encrypted Access</span>
                        <span className="h-1 w-1 rounded-full bg-[#8b8d99]" />
                        <span>24/7 Monitored</span>
                    </div>
                </div>
            </div>

            {/* RIGHT — cream form panel */}
            <div className="flex w-full flex-col justify-center bg-[#f7f2e9] px-8 py-16 sm:px-16 lg:w-1/2 lg:px-24">
                <div className="mx-auto w-full max-w-md">
                    <div className="mb-2 flex items-center gap-3">
                        <span className="h-px w-8 bg-[#c9a24b]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a24b]">
                            Admin Access
                        </span>
                    </div>

                    <h1 className="mt-4 font-['Georgia',_serif] text-4xl font-bold text-[#1b1c26] sm:text-5xl">
                        Admin Login
                    </h1>

                    <p className="mt-3 text-[15px] text-[#6b6c78]">
                        Sign in to access the Verum &amp; Co. admin panel.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#6b6c78]">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@verum.com"
                                required
                                className="h-12 w-full rounded-md border border-[#ddd5c4] bg-[#fbf8f2] px-4 font-sans text-[15px] text-[#1b1c26] outline-none transition placeholder:text-[#a6a190] focus:border-[#c9a24b] focus:ring-1 focus:ring-[#c9a24b]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#6b6c78]">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    required
                                    className="h-12 w-full rounded-md border border-[#ddd5c4] bg-[#fbf8f2] px-4 pr-11 font-sans text-[15px] text-[#1b1c26] outline-none transition placeholder:text-[#a6a190] focus:border-[#c9a24b] focus:ring-1 focus:ring-[#c9a24b]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a6a190] transition hover:text-[#6b6c78]"
                                    tabIndex={-1}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 flex h-12 w-full items-center justify-center rounded-md bg-[#1b1c26] font-sans text-[15px] font-semibold text-[#f5efe4] transition hover:bg-[#12131c] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <ButtonLoader label="Signing in…" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-[#6b6c78]">
                        Not an admin?{" "}
                        <a
                            href="/"
                            className="font-semibold text-[#1b1c26] underline decoration-[#c9a24b] decoration-2 underline-offset-4"
                        >
                            Return to storefront
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
