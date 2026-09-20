import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Plus,
    Search,
    Package,
    Pencil,
    Trash2,
    AlertTriangle,
    RotateCcw,
    ChevronDown,
    Boxes,
    BadgeCheck,
    CircleAlert,
    ArrowUpRight,
    SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import { deleteProduct, getSellerProducts } from "@/api/product.api";

const FILTERS = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "hidden", label: "Hidden" },
    { id: "oos", label: "Out of stock" },
];

const SORTS = [
    { id: "newest", label: "Newest first" },
    { id: "price-asc", label: "Price: low → high" },
    { id: "price-desc", label: "Price: high → low" },
    { id: "stock-desc", label: "Most stock" },
];

// simple price helper
function inr(n) {
    if (!n) {
        n = 0;
    }
    return "₹" + Number(n).toLocaleString("en-IN");
}

function categoryName(c) {
    if (typeof c === "object") {
        if (c && c.name) {
            return c.name;
        }
        return "—";
    }
    if (c) {
        return c;
    }
    return "—";
}

// Backend stores images as [{ url }] but older docs used plain strings — handle both.
function imageSrc(p) {
    const first = p?.images?.[0];
    if (!first) return "";
    if (typeof first === "string") return first;
    return first.url || "";
}

// small pill to show product status
function StatusPill(props) {
    const product = props.product;

    if (Number(product.stock) <= 0) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200">
                <CircleAlert size={12} />
                Out of stock
            </span>
        );
    }

    if (product.isActive === false) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
                Hidden
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
        </span>
    );
}

function SkeletonRow() {
    return (
        <div className="flex items-center gap-3.5 rounded-2xl border border-[#ece5d6] bg-white p-4">
            <div className="verum-shimmer h-12 w-12 shrink-0 rounded-2xl" />
            <div className="flex-1 space-y-2">
                <div className="verum-shimmer h-3.5 w-1/2 rounded" />
                <div className="verum-shimmer h-3 w-1/4 rounded" />
            </div>
            <div className="verum-shimmer hidden h-8 w-20 rounded-full sm:block" />
        </div>
    );
}

function SellerProducts() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("newest");
    const [sortOpen, setSortOpen] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    const [confirmId, setConfirmId] = useState("");

    async function fetchProducts() {
        setLoading(true);
        setError("");
        try {
            const response = await getSellerProducts();
            if (response.products) {
                setProducts(response.products);
            } else if (response.data) {
                setProducts(response.data);
            } else {
                setProducts([]);
            }
        } catch (err) {
            let msg = "Failed to load products. Please try again.";
            if (err && err.response && err.response.data && err.response.data.message) {
                msg = err.response.data.message;
            }
            setError(msg);
        }
        setLoading(false);
    }

    async function handleDelete(id, name) {
        if (confirmId !== id) {
            setConfirmId(id);
            return;
        }
        setDeletingId(id);
        // optimistic removal so the dashboard + list feel instant
        const previous = products;
        setProducts((list) => list.filter((p) => String(p._id) !== String(id)));
        setConfirmId("");
        try {
            await deleteProduct(id);
            toast.success(`“${name || "Product"}” deleted`);
        } catch (err) {
            setProducts(previous);
            toast.error(err?.response?.data?.message || "Failed to delete product.");
        } finally {
            setDeletingId("");
        }
    }

    // load on mount + refresh right after create/update/delete
    useEffect(
        function () {
            let mounted = true;

            async function load() {
                try {
                    const response = await getSellerProducts();
                    let list = [];
                    if (response.products) {
                        list = response.products;
                    } else if (response.data) {
                        list = response.data;
                    }
                    if (mounted === true) {
                        setProducts(list);
                    }
                } catch (err) {
                    let msg = "Failed to load products. Please try again.";
                    if (err && err.response && err.response.data && err.response.data.message) {
                        msg = err.response.data.message;
                    }
                    if (mounted === true) {
                        setError(msg);
                    }
                }
                if (mounted === true) {
                    setLoading(false);
                }
            }

            load();

            return function () {
                mounted = false;
            };
        },
        [location.state?.refresh, location.state?.deleted, location.state?.updated, location.state?.created],
    );

    // count for filter pills with simple loops
    let allCount = products.length;
    let activeCount = 0;
    let hiddenCount = 0;
    let oosCount = 0;
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        if (p.isActive !== false && Number(p.stock) > 0) {
            activeCount = activeCount + 1;
        }
        if (p.isActive === false) {
            hiddenCount = hiddenCount + 1;
        }
        if (Number(p.stock) <= 0) {
            oosCount = oosCount + 1;
        }
    }
    const counts = { all: allCount, active: activeCount, hidden: hiddenCount, oos: oosCount };

    // filter + search + sort in simple steps
    let visible = [];
    for (let i = 0; i < products.length; i++) {
        const p = products[i];

        // filter
        if (filter === "active") {
            if (!(p.isActive !== false && Number(p.stock) > 0)) {
                continue;
            }
        }
        if (filter === "hidden") {
            if (p.isActive !== false) {
                continue;
            }
        }
        if (filter === "oos") {
            if (!(Number(p.stock) <= 0)) {
                continue;
            }
        }

        // search
        const q = query.trim().toLowerCase();
        if (q !== "") {
            let name = "";
            if (p.name) {
                name = p.name.toLowerCase();
            }
            let cat = categoryName(p.category).toLowerCase();
            if (name.includes(q) === false && cat.includes(q) === false) {
                continue;
            }
        }

        visible.push(p);
    }

    // sort
    if (sort === "price-asc") {
        visible.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sort === "price-desc") {
        visible.sort(function (a, b) {
            return b.price - a.price;
        });
    } else if (sort === "stock-desc") {
        visible.sort(function (a, b) {
            return b.stock - a.stock;
        });
    } else {
        visible.sort(function (a, b) {
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
    }

    // find current sort label
    let sortLabel = "Newest first";
    for (let i = 0; i < SORTS.length; i++) {
        if (SORTS[i].id === sort) {
            sortLabel = SORTS[i].label;
        }
    }

    // what to show in main area
    let mainContent;
    if (loading === true) {
        mainContent = (
            <div className="space-y-3">
                {[0, 1, 2, 3].map(function (i) {
                    return <SkeletonRow key={i} />;
                })}
            </div>
        );
    } else if (error !== "") {
        mainContent = (
            <div className="flex flex-col items-center rounded-3xl border border-red-200 bg-white px-6 py-12 text-center shadow-sm">
                <span className="grid h-14 w-14 place-items-center rounded-3xl bg-red-50 text-red-500">
                    <AlertTriangle size={24} />
                </span>
                <h3 className="mt-4 font-serif text-[19px] font-semibold text-[#14171F]">
                    Something went wrong
                </h3>
                <p className="mt-1 max-w-sm text-[13.5px] text-[#6B6456]">{error}</p>
                <button
                    type="button"
                    onClick={fetchProducts}
                    className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#14171F] px-5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C9A15A] hover:text-[#14171F]"
                >
                    <RotateCcw size={15} />
                    Try again
                </button>
            </div>
        );
    } else if (products.length === 0) {
        mainContent = (
            <div className="relative overflow-hidden rounded-[28px] border border-[#e7e0d3] bg-white px-6 py-12 text-center shadow-sm sm:py-16">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#C9A15A]/10 blur-3xl" />
                    <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#C9A15A]/10 blur-3xl" />
                </div>
                <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-[28px] bg-gradient-to-br from-[#14171F] to-[#3a3f4d] text-[#E3C37C] shadow-xl">
                    <Package size={32} />
                </span>
                <h3 className="relative mt-5 font-serif text-[22px] font-semibold text-[#14171F] sm:text-[26px]">
                    Your shelf is empty — <span className="italic text-[#C9A15A]">for now.</span>
                </h3>
                <p className="relative mx-auto mt-2 max-w-sm text-[13.5px] leading-6 text-[#6B6456]">
                    List your first product and it will appear here instantly, ready for
                    thousands of buyers.
                </p>
                <Link
                    to="/seller/products/create"
                    className="verum-btn-shine group relative mt-6 inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[#C9A15A] px-7 text-[14px] font-bold text-[#14171F] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(201,161,90,0.9)]"
                >
                    <Plus size={17} strokeWidth={2.5} />
                    Create your first product
                    <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </Link>
            </div>
        );
    } else if (visible.length === 0) {
        mainContent = (
            <div className="rounded-3xl border border-dashed border-[#d8cfc1] bg-white/60 px-6 py-12 text-center">
                <p className="font-serif text-[18px] font-semibold text-[#14171F]">
                    No matches for “{query}”
                </p>
                <p className="mt-1 text-[13px] text-[#6B6456]">
                    Try a different search or clear the filters.
                </p>
                <button
                    type="button"
                    onClick={function () {
                        setQuery("");
                        setFilter("all");
                    }}
                    className="mt-4 inline-flex h-10 items-center rounded-full border border-[#14171F] px-5 text-[13px] font-semibold transition-all hover:bg-[#14171F] hover:text-white"
                >
                    Clear search &amp; filters
                </button>
            </div>
        );
    } else {
        mainContent = (
            <>
                {/* Mobile cards */}
                <div className="space-y-3 md:hidden">
                    {visible.map(function (p) {
                        let letter = "P";
                        if (p.name) {
                            letter = p.name[0].toUpperCase();
                        }
                        const src = imageSrc(p);
                        const isConfirming = confirmId === String(p._id);
                        const isDeleting = deletingId === String(p._id);
                        return (
                            <div
                                key={p._id}
                                className="rounded-3xl border border-[#e7e0d3] bg-white p-4 shadow-[0_2px_14px_-8px_rgba(20,23,31,0.15)]"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#f7f3ec] font-serif text-lg font-bold text-[#8a6a2a] ring-1 ring-[#e7e0d3]">
                                        {src ? (
                                            <img
                                                src={src}
                                                alt={p.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            letter
                                        )}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[14.5px] font-bold text-[#14171F]">
                                            {p.name}
                                        </p>
                                        <p className="mt-0.5 truncate text-[12px] text-[#969087]">
                                            {categoryName(p.category)} · {inr(p.price)}
                                        </p>
                                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                            <StatusPill product={p} />
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#f4efe5] px-2.5 py-1 text-[11px] font-bold text-[#6B6456] ring-1 ring-[#e7e0d3]">
                                                <Boxes size={12} />
                                                {p.stock} left
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <Link
                                        to={`/seller/products/${p._id}/edit`}
                                        className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#14171F] text-[13px] font-bold text-white transition-colors active:bg-[#C9A15A] active:text-[#14171F]"
                                    >
                                        <Pencil size={14} />
                                        Edit product
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(p._id, p.name)}
                                        disabled={isDeleting}
                                        className={`flex h-10 items-center justify-center gap-1.5 rounded-2xl border px-4 text-[13px] font-bold transition-colors disabled:opacity-60 ${
                                            isConfirming
                                                ? "border-red-500 bg-red-600 text-white"
                                                : "border-red-200 text-red-600 active:bg-red-50"
                                        }`}
                                        title={isConfirming ? "Tap again to confirm delete" : "Delete product"}
                                    >
                                        <Trash2 size={14} />
                                        {isConfirming ? "Sure?" : ""}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop table */}
                <div className="hidden overflow-hidden rounded-3xl border border-[#e7e0d3] bg-white shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)] md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-[13.5px]">
                            <thead>
                                <tr className="border-b border-[#efe9db] bg-[#fbf9f4] text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#969087]">
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-4 py-4">Category</th>
                                    <th className="px-4 py-4">Price</th>
                                    <th className="px-4 py-4">Stock</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3eee4]">
                                {visible.map(function (p) {
                                    let letter = "P";
                                    if (p.name) {
                                        letter = p.name[0].toUpperCase();
                                    }
                                    const src = imageSrc(p);
                                    const isConfirming = confirmId === String(p._id);
                                    const isDeleting = deletingId === String(p._id);
                                    let stockColor = "text-[#3a3f4d]";
                                    if (Number(p.stock) <= 5) {
                                        stockColor = "text-amber-600";
                                    }
                                    return (
                                        <tr
                                            key={p._id}
                                            className="group transition-colors hover:bg-[#fbf8f1]"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#f7f3ec] font-serif text-[15px] font-bold text-[#8a6a2a] ring-1 ring-[#e7e0d3]">
                                                        {src ? (
                                                            <img
                                                                src={src}
                                                                alt=""
                                                                loading="lazy"
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                        ) : (
                                                            letter
                                                        )}
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block max-w-[240px] truncate font-bold text-[#14171F]">
                                                            {p.name}
                                                        </span>
                                                        <span className="block truncate text-[12px] text-[#969087]">
                                                            ID ···{String(p._id).slice(-6)}
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-[#6B6456]">
                                                {categoryName(p.category)}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 font-bold text-[#14171F]">
                                                {inr(p.price)}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 font-semibold ${stockColor}`}
                                                >
                                                    <Boxes size={14} className="text-[#C9A15A]" />
                                                    {p.stock}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <StatusPill product={p} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="inline-flex items-center gap-2">
                                                    <Link
                                                        to={`/seller/products/${p._id}/edit`}
                                                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#14171F]/20 px-4 text-[12.5px] font-bold text-[#14171F] transition-all hover:-translate-y-0.5 hover:border-[#14171F] hover:bg-[#14171F] hover:text-white hover:shadow-md"
                                                    >
                                                        <Pencil size={13} />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(p._id, p.name)}
                                                        disabled={isDeleting}
                                                        title={isConfirming ? "Click again to confirm delete" : "Delete product"}
                                                        className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-bold transition-all disabled:opacity-60 ${
                                                            isConfirming
                                                                ? "border-red-500 bg-red-600 text-white hover:bg-red-700"
                                                                : "border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50"
                                                        }`}
                                                    >
                                                        <Trash2 size={13} />
                                                        {isConfirming ? "Sure?" : "Delete"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#efe9db] bg-[#fbf9f4] px-6 py-3.5 text-[12.5px] text-[#6B6456]">
                        <span>
                            Showing <strong className="text-[#14171F]">{visible.length}</strong>{" "}
                            of {products.length} products
                        </span>
                        <span className="hidden items-center gap-1.5 sm:flex">
                            <BadgeCheck size={14} className="text-[#C9A15A]" />
                            Catalog synced just now
                        </span>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-5">
            {/* Page head */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A15A]">
                        <span className="h-px w-8 bg-[#C9A15A]" />
                        Catalog · {counts.all} item{counts.all === 1 ? "" : "s"}
                    </p>
                    <h2 className="mt-2 font-serif text-[26px] font-semibold leading-tight text-[#14171F] sm:text-[32px]">
                        My Products
                    </h2>
                    <p className="mt-1 text-[13.5px] text-[#6B6456]">
                        Search, filter and keep every listing sharp.
                    </p>
                </div>
                <Link
                    to="/seller/products/create"
                    className="verum-btn-shine group relative inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#14171F] px-5 text-[13.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C9A15A] hover:text-[#14171F] hover:shadow-[0_14px_30px_-10px_rgba(201,161,90,0.8)] active:translate-y-0"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    Add Product
                </Link>
            </div>

            {/* Toolbar */}
            <div className="rounded-3xl border border-[#e7e0d3] bg-white p-3 shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)] sm:p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="group relative flex-1">
                        <Search
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#969087] transition-colors group-focus-within:text-[#C9A15A]"
                        />
                        <input
                            value={query}
                            onChange={function (e) {
                                setQuery(e.target.value);
                            }}
                            type="search"
                            placeholder="Search by name or category…"
                            className="h-11 w-full rounded-2xl border border-[#e7e0d3] bg-[#fbf9f4] pl-11 pr-4 text-[13.5px] outline-none transition-all placeholder:text-[#969087] focus:border-[#C9A15A] focus:bg-white focus:ring-4 focus:ring-[#C9A15A]/15"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={function () {
                                    if (sortOpen === true) {
                                        setSortOpen(false);
                                    } else {
                                        setSortOpen(true);
                                    }
                                }}
                                className={`inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-[13px] font-semibold transition-all ${
                                    sortOpen
                                        ? "border-[#C9A15A] bg-[#fbf6ea] text-[#14171F] ring-4 ring-[#C9A15A]/15"
                                        : "border-[#e7e0d3] bg-white text-[#3a3f4d] hover:border-[#C9A15A]/60"
                                }`}
                            >
                                <SlidersHorizontal size={15} className="text-[#C9A15A]" />
                                <span className="hidden sm:inline">{sortLabel}</span>
                                <span className="sm:hidden">Sort</span>
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {sortOpen === true && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={function () {
                                            setSortOpen(false);
                                        }}
                                    />
                                    <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-[#e7e0d3] bg-white p-1.5 shadow-xl">
                                        {SORTS.map(function (s) {
                                            let btnClass = "text-[#3a3f4d] hover:bg-[#f7f3ec]";
                                            if (sort === s.id) {
                                                btnClass = "bg-[#14171F] text-white";
                                            }
                                            return (
                                                <button
                                                    key={s.id}
                                                    type="button"
                                                    onClick={function () {
                                                        setSort(s.id);
                                                        setSortOpen(false);
                                                    }}
                                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors ${btnClass}`}
                                                >
                                                    {s.label}
                                                    {sort === s.id && (
                                                        <BadgeCheck size={15} className="text-[#E3C37C]" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter pills */}
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {FILTERS.map(function (f) {
                        const active = filter === f.id;
                        let pillClass =
                            "bg-[#f4efe5] text-[#6B6456] ring-1 ring-[#e7e0d3] hover:bg-white hover:text-[#14171F]";
                        if (active === true) {
                            pillClass = "bg-[#14171F] text-white shadow-md";
                        }
                        let countClass = "bg-white text-[#969087] ring-1 ring-[#e7e0d3]";
                        if (active === true) {
                            countClass = "bg-[#C9A15A] text-[#14171F]";
                        }
                        return (
                            <button
                                key={f.id}
                                type="button"
                                onClick={function () {
                                    setFilter(f.id);
                                }}
                                className={`relative shrink-0 rounded-full px-4 py-2 text-[12.5px] font-bold transition-all active:scale-95 ${pillClass}`}
                            >
                                {f.label}
                                <span
                                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10.5px] ${countClass}`}
                                >
                                    {counts[f.id]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            {mainContent}
        </div>
    );
}

export default SellerProducts;
