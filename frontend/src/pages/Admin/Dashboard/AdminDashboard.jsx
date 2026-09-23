import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Store,
    Users,
    Package,
    ShieldCheck,
    ArrowUpRight,
    UserPlus,
    ArrowRight,
} from "lucide-react";

import { getAdminStats, getSellers } from "@/api/admin.api";

function StatCard({ icon: Icon, label, value, hint, tile }) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-[#e7e0d3] bg-white p-5 shadow-[0_2px_16px_-8px_rgba(20,23,31,0.15)]">
            <div className="flex items-start justify-between gap-3">
                <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${tile}`}
                >
                    <Icon size={20} strokeWidth={2.1} />
                </span>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#969087]">
                {label}
            </p>
            <p className="mt-1 font-serif text-[30px] font-semibold leading-none text-[#14171F]">
                {value}
            </p>
            <p className="mt-2 text-[12.5px] text-[#6B6456]">{hint}</p>
        </div>
    );
}

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentSellers, setRecentSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const [statsRes, sellersRes] = await Promise.all([
                    getAdminStats(),
                    getSellers(),
                ]);
                if (!mounted) return;
                setStats(statsRes.stats || null);
                setRecentSellers((sellersRes.sellers || []).slice(0, 5));
            } catch {
                if (!mounted) return;
                setStats(null);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const cards = [
        {
            label: "Total Sellers",
            value: loading ? "…" : (stats?.sellerCount ?? 0),
            hint: "Accounts with seller access",
            icon: Store,
            tile: "bg-[#14171F] text-[#E3C37C]",
        },
        {
            label: "Customers",
            value: loading ? "…" : (stats?.customerCount ?? 0),
            hint: "Registered shoppers",
            icon: Users,
            tile: "bg-emerald-600 text-white",
        },
        {
            label: "Products",
            value: loading ? "…" : (stats?.productCount ?? 0),
            hint: "Live across all sellers",
            icon: Package,
            tile: "bg-[#f0ebe1] text-[#8a6a2a]",
        },
        {
            label: "Admins",
            value: loading ? "…" : (stats?.adminCount ?? 0),
            hint: "Full-access accounts",
            icon: ShieldCheck,
            tile: "bg-gradient-to-br from-[#E3C37C] to-[#A9803F] text-[#14171F]",
        },
    ];

    return (
        <div className="space-y-5 sm:space-y-6">
            <section className="relative overflow-hidden rounded-[28px] bg-[#14171F] p-6 text-white sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C9A15A]/20 blur-3xl" />
                    <div className="verum-grain absolute inset-0" />
                </div>
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A15A]">
                            <span className="h-px w-8 bg-[#C9A15A]" />
                            Admin Panel
                        </p>
                        <h2 className="mt-3 font-serif text-[28px] font-semibold leading-[1.1] sm:text-[36px]">
                            Manage your sellers,{" "}
                            <span className="italic text-[#E3C37C]">
                                grow the atelier.
                            </span>
                        </h2>
                        <p className="mt-3 max-w-md text-[13.5px] leading-6 text-white/65">
                            {loading
                                ? "Pulling the latest store numbers…"
                                : `You have ${stats?.sellerCount ?? 0} sellers and ${stats?.productCount ?? 0} products on the platform.`}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                to="/admin/sellers"
                                className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#C9A15A] px-5 text-[13.5px] font-bold text-[#14171F] transition-all hover:-translate-y-0.5 hover:bg-[#E3C37C]"
                            >
                                <UserPlus size={16} strokeWidth={2.5} />
                                Manage sellers
                                <ArrowRight
                                    size={15}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                {cards.map((c) => (
                    <StatCard key={c.label} {...c} />
                ))}
            </div>

            <section className="overflow-hidden rounded-3xl border border-[#e7e0d3] bg-white">
                <div className="flex items-center justify-between gap-3 border-b border-[#f0ebe1] p-5 sm:px-6">
                    <div>
                        <h3 className="font-serif text-[18px] font-semibold text-[#14171F]">
                            Recent sellers
                        </h3>
                        <p className="text-[12.5px] text-[#6B6456]">
                            Latest seller accounts
                        </p>
                    </div>
                    <Link
                        to="/admin/sellers"
                        className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e3ddd2] px-3.5 py-2 text-[12.5px] font-semibold text-[#14171F] transition-all hover:border-[#14171F] hover:bg-[#14171F] hover:text-white"
                    >
                        View all
                        <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>
                {loading ? (
                    <div className="space-y-3 p-5">
                        {[0, 1].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="verum-shimmer h-12 w-12 rounded-2xl" />
                                <div className="flex-1 space-y-2">
                                    <div className="verum-shimmer h-3.5 w-2/3 rounded" />
                                    <div className="verum-shimmer h-3 w-1/3 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : recentSellers.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                        <p className="font-serif text-[16px] font-semibold text-[#14171F]">
                            No sellers yet
                        </p>
                        <p className="mt-1 text-[13px] text-[#6B6456]">
                            Create the first seller account.
                        </p>
                        <Link
                            to="/admin/sellers"
                            className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#14171F] px-5 text-[13px] font-semibold text-white"
                        >
                            <UserPlus size={15} />
                            Go to sellers
                        </Link>
                    </div>
                ) : (
                    <ul className="divide-y divide-[#f3eee4]">
                        {recentSellers.map((s) => (
                            <li
                                key={s._id}
                                className="flex items-center gap-3.5 p-4 sm:px-6"
                            >
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#14171F] font-serif text-[14px] font-bold text-[#E3C37C]">
                                    {(s.name?.[0] || "S").toUpperCase()}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-[14px] font-semibold text-[#14171F]">
                                        {s.name}
                                    </span>
                                    <span className="block truncate text-[12px] text-[#969087]">
                                        {s.email}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;
