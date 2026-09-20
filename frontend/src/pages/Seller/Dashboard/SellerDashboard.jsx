import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Package,
    BadgeCheck,
    Boxes,
    Wallet,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    ArrowUpRight,
    Plus,
    ClipboardCheck,
    Sparkles,
    Store,
    ChevronRight,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { getSellerProducts } from "@/api/product.api";

// simple helper to show price in rupees
function inr(n) {
    if (!n) {
        n = 0;
    }
    return "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

// one small card for the top numbers
function StatCard(props) {
    const stat = props.stat;
    const Icon = stat.icon;

    let deltaIcon = null;
    if (stat.up === true) {
        deltaIcon = <TrendingUp size={12} />;
    } else if (stat.down === true) {
        deltaIcon = <TrendingDown size={12} />;
    }

    let bigValue;
    if (stat.isCurrency === true) {
        bigValue = inr(stat.value);
    } else {
        bigValue = Number(stat.value).toLocaleString("en-IN");
    }

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-[#e7e0d3] bg-white p-5 shadow-[0_2px_16px_-8px_rgba(20,23,31,0.15)] transition-shadow hover:shadow-[0_20px_44px_-18px_rgba(20,23,31,0.3)]">
            <div
                className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-opacity ${stat.glow}`}
            />
            <div className="relative flex items-start justify-between gap-3">
                <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${stat.tile} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                >
                    <Icon size={20} strokeWidth={2.1} />
                </span>
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${stat.chip}`}
                >
                    {deltaIcon}
                    {stat.delta}
                </span>
            </div>
            <p className="relative mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#969087]">
                {stat.label}
            </p>
            <p className="relative mt-1 font-serif text-[30px] font-semibold leading-none text-[#14171F]">
                {props.ready === false ? (
                    <span className="verum-shimmer inline-block h-8 w-20 rounded-lg" />
                ) : (
                    bigValue
                )}
            </p>
            <p className="relative mt-2 text-[12.5px] text-[#6B6456]">{stat.hint}</p>

            {/* mini sparkline */}
            <div className="relative mt-3 flex h-8 items-end gap-1">
                {stat.spark.map(function (h, i) {
                    return (
                        <span
                            key={i}
                            style={{ height: h + "%" }}
                            className={`w-full origin-bottom rounded-full ${stat.bar}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// Backend stores images as [{ url }] but older payloads used plain strings — handle both.
function imageSrc(p) {
    const first = p?.images?.[0];
    if (!first) return "";
    if (typeof first === "string") return first;
    return first.url || "";
}

function SellerDashboard() {
    const { user } = useAuth();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // get first name for hello message
    let firstName = "Seller";
    if (user && user.name) {
        firstName = user.name.split(" ")[0];
    }

    // today's date text
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    // load products — refetch on mount, after any CRUD navigation, and when tab regains focus
    // so create/update/delete are always reflected on the dashboard.
    const loadProducts = useCallback(async function (silent) {
        if (silent !== true) setLoading(true);
        try {
            const res = await getSellerProducts();
            let list = [];
            if (res.products) {
                list = res.products;
            } else if (res.data) {
                list = res.data;
            }
            // newest first, so fresh creates/edits surface at the top
            list.sort(function (a, b) {
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            });
            setProducts(list);
        } catch (err) {
            console.log(err);
            if (silent !== true) setProducts([]);
        }
        setLoading(false);
    }, []);

    useEffect(
        function () {
            let cancelled = false;
            async function load() {
                if (cancelled) return;
                await loadProducts();
            }
            load();
            return function () {
                cancelled = true;
            };
        },
        [loadProducts, location.state?.refresh, location.state?.created, location.state?.updated, location.state?.deleted],
    );

    useEffect(
        function () {
            function onFocus() {
                loadProducts(true);
            }
            window.addEventListener("focus", onFocus);
            return function () {
                window.removeEventListener("focus", onFocus);
            };
        },
        [loadProducts],
    );

    // count totals with simple loop
    let total = products.length;
    let active = 0;
    let out = 0;
    let value = 0;
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        if (p.isActive !== false) {
            active = active + 1;
        }
        if (Number(p.stock) <= 0) {
            out = out + 1;
        }
        value = value + Number(p.price || 0) * Number(p.stock || 0);
    }
    const totals = { total: total, active: active, out: out, value: value };

    const stats = [
        {
            label: "Total Products",
            value: totals.total,
            delta: loading ? "…" : "+ live",
            up: true,
            hint: totals.active + " active right now",
            icon: Package,
            tile: "bg-[#14171F] text-[#E3C37C]",
            chip: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
            glow: "bg-[#C9A15A]/20",
            bar: "bg-[#14171F]/85",
            spark: [35, 55, 42, 68, 58, 80, 72, 95],
        },
        {
            label: "Active Listings",
            value: totals.active,
            delta: loading ? "…" : "healthy",
            up: true,
            hint: "Visible to buyers today",
            icon: BadgeCheck,
            tile: "bg-emerald-600 text-white",
            chip: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
            glow: "bg-emerald-400/20",
            bar: "bg-emerald-500/80",
            spark: [30, 48, 52, 46, 66, 74, 70, 92],
        },
        {
            label: "Out of Stock",
            value: totals.out,
            delta: totals.out > 0 ? "needs care" : "all good",
            down: totals.out > 0,
            up: totals.out === 0,
            hint: "Restock to keep selling",
            icon: Boxes,
            tile: totals.out > 0 ? "bg-amber-500 text-white" : "bg-[#f0ebe1] text-[#8a6a2a]",
            chip:
                totals.out > 0
                    ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
            glow: "bg-amber-400/20",
            bar: "bg-amber-500/80",
            spark: [70, 55, 60, 42, 50, 36, 40, 28],
        },
        {
            label: "Inventory Value",
            value: totals.value,
            isCurrency: true,
            delta: loading ? "…" : "stock worth",
            up: true,
            hint: "At current list prices",
            icon: Wallet,
            tile: "bg-gradient-to-br from-[#E3C37C] to-[#A9803F] text-[#14171F]",
            chip: "bg-[#C9A15A]/15 text-[#8a6a2a] ring-1 ring-[#C9A15A]/30",
            glow: "bg-[#C9A15A]/25",
            bar: "bg-[#C9A15A]",
            spark: [25, 38, 44, 58, 52, 70, 78, 96],
        },
    ];

    // take first 5 newest products for recent list (already sorted newest-first on load)
    const recent = [...products]
        .sort(function (a, b) {
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        })
        .slice(0, 5);

    // simple checklist
    const checklist = [
        { done: totals.total > 0, label: "List your first product" },
        { done: totals.total >= 3, label: "Build a 3+ item catalog" },
        { done: totals.out === 0 && totals.total > 0, label: "Keep everything in stock" },
    ];
    let doneCount = 0;
    for (let i = 0; i < checklist.length; i++) {
        if (checklist[i].done === true) {
            doneCount = doneCount + 1;
        }
    }

    // text for hero paragraph
    let heroText = "Pulling your latest catalog numbers…";
    if (loading === false) {
        if (totals.total === 0) {
            heroText = "Your studio is ready — list your first product and start your Verum journey.";
        } else {
            let s = "s";
            if (totals.total === 1) {
                s = "";
            }
            heroText = "You have " + totals.total + " product" + s + " live worth " + inr(totals.value) + " in stock.";
        }
    }

    const quickLinks = [
        {
            to: "/seller/products/create",
            icon: Plus,
            title: "New product",
            desc: "List in 60 seconds",
            dark: true,
        },
        {
            to: "/seller/products",
            icon: Package,
            title: "Catalog",
            desc: totals.total + " items",
        },
        {
            to: "/seller/inventory",
            icon: Boxes,
            title: "Inventory",
            desc: "Check stock",
        },
        {
            to: "/seller/orders",
            icon: ClipboardCheck,
            title: "Orders",
            desc: "Fulfil sales",
        },
    ];

    return (
        <div className="space-y-5 sm:space-y-6">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-[28px] bg-[#14171F] p-6 text-white shadow-[0_28px_60px_-24px_rgba(20,23,31,0.6)] sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-0">
                    <div className="verum-orb-a absolute -right-24 -top-24 h-72 w-72 rounded-full" />
                    <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#C9A15A]/10 blur-3xl" />
                    <div className="verum-grain absolute inset-0" />
                    <div
                        className="absolute inset-0 opacity-[0.14]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                            backgroundSize: "44px 44px",
                            maskImage:
                                "radial-gradient(ellipse 90% 100% at 100% 0%, black 30%, transparent 75%)",
                        }}
                    />
                </div>

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A15A]">
                            <span className="h-px w-8 bg-[#C9A15A]" />
                            {today}
                        </p>
                        <h2 className="mt-3 font-serif text-[28px] font-semibold leading-[1.1] sm:text-[36px] lg:text-[42px]">
                            Good to see you, {firstName}.{" "}
                            <span className="italic text-[#E3C37C]">
                                Let&apos;s grow today.
                            </span>
                        </h2>
                        <p className="mt-3 max-w-md text-[13.5px] leading-6 text-white/65 sm:text-[14px]">
                            {heroText}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <Link
                                to="/seller/products/create"
                                className="verum-btn-shine group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-[#C9A15A] px-5 text-[13.5px] font-bold text-[#14171F] transition-all hover:-translate-y-0.5 hover:bg-[#E3C37C] hover:shadow-[0_14px_30px_-10px_rgba(201,161,90,0.9)] active:translate-y-0"
                            >
                                <Plus size={16} strokeWidth={2.5} />
                                Add product
                                <ArrowRight
                                    size={15}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                            <Link
                                to="/seller/products"
                                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[13.5px] font-semibold text-white/90 transition-all hover:-translate-y-0.5 hover:border-[#C9A15A]/60 hover:text-white"
                            >
                                <Store size={15} className="text-[#E3C37C]" />
                                View catalog
                            </Link>
                        </div>
                    </div>

                    {/* Setup progress */}
                    <div className="w-full max-w-sm shrink-0 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-2 text-[13px] font-semibold">
                                <Sparkles size={15} className="text-[#E3C37C]" />
                                Store setup
                            </p>
                            <span className="rounded-full bg-[#C9A15A]/20 px-2.5 py-1 text-[11px] font-bold text-[#E3C37C] ring-1 ring-[#C9A15A]/30">
                                {doneCount}/3 complete
                            </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                                style={{ width: (doneCount / 3) * 100 + "%" }}
                                className="h-full rounded-full bg-gradient-to-r from-[#A9803F] via-[#C9A15A] to-[#E3C37C]"
                            />
                        </div>
                        <ul className="mt-4 space-y-2.5">
                            {checklist.map(function (c) {
                                return (
                                    <li
                                        key={c.label}
                                        className="flex items-center gap-2.5 text-[13px]"
                                    >
                                        <span
                                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors ${
                                                c.done
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-white/10 text-white/40 ring-1 ring-white/15"
                                            }`}
                                        >
                                            <ClipboardCheck size={12} />
                                        </span>
                                        <span
                                            className={
                                                c.done
                                                    ? "text-white/85 line-through decoration-white/30"
                                                    : "text-white/65"
                                            }
                                        >
                                            {c.label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                {stats.map(function (s) {
                    return <StatCard key={s.label} stat={s} ready={!loading} />;
                })}
            </div>

            {/* Bottom split */}
            <div className="grid grid-cols-1 gap-3.5 sm:gap-4 lg:grid-cols-[1.5fr_1fr]">
                {/* Recent products */}
                <section className="overflow-hidden rounded-3xl border border-[#e7e0d3] bg-white shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)]">
                    <div className="flex items-center justify-between gap-3 border-b border-[#f0ebe1] p-5 sm:px-6">
                        <div>
                            <h3 className="font-serif text-[18px] font-semibold text-[#14171F]">
                                Recent products
                            </h3>
                            <p className="text-[12.5px] text-[#6B6456]">
                                Your latest listings
                            </p>
                        </div>
                        <Link
                            to="/seller/products"
                            className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e3ddd2] px-3.5 py-2 text-[12.5px] font-semibold text-[#14171F] transition-all hover:border-[#14171F] hover:bg-[#14171F] hover:text-white"
                        >
                            View all
                            <ArrowUpRight
                                size={14}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
                    </div>

                    {loading === true ? (
                        <div className="space-y-3 p-5 sm:px-6">
                            {[0, 1, 2].map(function (i) {
                                return (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="verum-shimmer h-12 w-12 rounded-2xl" />
                                        <div className="flex-1 space-y-2">
                                            <div className="verum-shimmer h-3.5 w-2/3 rounded" />
                                            <div className="verum-shimmer h-3 w-1/3 rounded" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : recent.length === 0 ? (
                        <div className="flex flex-col items-center px-6 py-10 text-center">
                            <span className="grid h-14 w-14 place-items-center rounded-3xl bg-[#f7f3ec] text-[#C9A15A]">
                                <Package size={24} />
                            </span>
                            <p className="mt-4 font-serif text-[16px] font-semibold text-[#14171F]">
                                No products yet
                            </p>
                            <p className="mt-1 max-w-xs text-[13px] leading-5 text-[#6B6456]">
                                Create your first listing — it takes less than
                                a minute and goes live instantly.
                            </p>
                            <Link
                                to="/seller/products/create"
                                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#14171F] px-5 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C9A15A] hover:text-[#14171F]"
                            >
                                <Plus size={15} />
                                Create product
                            </Link>
                        </div>
                    ) : (
                        <ul className="divide-y divide-[#f3eee4]">
                            {recent.map(function (p) {
                                let stockText = p.stock + " in stock";
                                if (p.stock <= 0) {
                                    stockText = "Out of stock";
                                }

                                let statusText = "Active";
                                let statusClass =
                                    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
                                if (p.isActive === false) {
                                    statusText = "Hidden";
                                    statusClass = "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
                                }

                                let firstLetter = "P";
                                if (p.name) {
                                    firstLetter = p.name[0].toUpperCase();
                                }
                                const src = imageSrc(p);

                                return (
                                    <li key={p._id}>
                                        <Link
                                            to={`/seller/products/${p._id}/edit`}
                                            className="group flex items-center gap-3.5 p-4 transition-colors hover:bg-[#fbf9f4] sm:px-6"
                                        >
                                            <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#f7f3ec] text-[15px] font-bold text-[#8a6a2a] ring-1 ring-[#e7e0d3]">
                                                {src ? (
                                                    <img
                                                        src={src}
                                                        alt=""
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    firstLetter
                                                )}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-[14px] font-semibold text-[#14171F]">
                                                    {p.name}
                                                </span>
                                                <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-[#969087]">
                                                    <span>{inr(p.price)}</span>
                                                    <span className="h-1 w-1 rounded-full bg-[#d8cfc1]" />
                                                    <span>{stockText}</span>
                                                </span>
                                            </span>
                                            <span
                                                className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold sm:inline-block ${statusClass}`}
                                            >
                                                {statusText}
                                            </span>
                                            <ChevronRight
                                                size={16}
                                                className="shrink-0 text-[#c8c0b4] transition-all group-hover:translate-x-1 group-hover:text-[#C9A15A]"
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>

                {/* Quick actions */}
                <section className="flex flex-col overflow-hidden rounded-3xl border border-[#e7e0d3] bg-white shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)]">
                    <div className="border-b border-[#f0ebe1] p-5 sm:px-6">
                        <h3 className="font-serif text-[18px] font-semibold text-[#14171F]">
                            Quick actions
                        </h3>
                        <p className="text-[12.5px] text-[#6B6456]">
                            Jump back into work
                        </p>
                    </div>
                    <div className="grid flex-1 grid-cols-1 gap-2.5 p-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-1 xl:grid-cols-2">
                        {quickLinks.map(function (a) {
                            const CardIcon = a.icon;
                            let cardClass =
                                "border-[#e7e0d3] bg-[#fbf9f4] text-[#14171F] hover:border-[#C9A15A]/50 hover:bg-white";
                            if (a.dark === true) {
                                cardClass =
                                    "border-[#14171F] bg-[#14171F] text-white hover:bg-[#232936]";
                            }
                            let iconBox = "bg-white text-[#C9A15A] ring-1 ring-[#e7e0d3]";
                            if (a.dark === true) {
                                iconBox = "bg-[#C9A15A] text-[#14171F]";
                            }
                            let descClass = "text-[#6B6456]";
                            if (a.dark === true) {
                                descClass = "text-white/60";
                            }
                            return (
                                <div key={a.title}>
                                    <Link
                                        to={a.to}
                                        className={`group flex h-full flex-col justify-between gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(20,23,31,0.35)] ${cardClass}`}
                                    >
                                        <span
                                            className={`grid h-9 w-9 place-items-center rounded-xl transition-transform group-hover:scale-110 ${iconBox}`}
                                        >
                                            <CardIcon size={17} />
                                        </span>
                                        <span>
                                            <span className="block text-[13.5px] font-bold">
                                                {a.title}
                                            </span>
                                            <span
                                                className={`mt-0.5 flex items-center gap-1 text-[12px] ${descClass}`}
                                            >
                                                {a.desc}
                                                <ArrowUpRight
                                                    size={13}
                                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                />
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mx-5 mb-5 rounded-2xl bg-gradient-to-br from-[#f7f3ec] to-[#efe7d6] p-4 text-[12.5px] leading-5 text-[#6B6456] ring-1 ring-[#e7e0d3] sm:mx-6">
                        <span className="font-semibold text-[#14171F]">
                            Pro tip —
                        </span>{" "}
                        products with clear photos sell up to 3× more. Keep
                        titles short and prices honest.
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SellerDashboard;
