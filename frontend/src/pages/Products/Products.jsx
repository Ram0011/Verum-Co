import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import ProductCard from "@/components/Product/ProductCard";
import useProducts from "@/hooks/useProducts";

// Builds a windowed pagination sequence, e.g. [1, '...', 4, 5, 6, '...', 12]
const getPageSequence = (current, total) => {
    const delta = 1;
    const range = [];
    const withDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        }
    }

    range.forEach((i) => {
        if (last !== undefined) {
            if (i - last === 2) withDots.push(last + 1);
            else if (i - last !== 1) withDots.push("...");
        }
        withDots.push(i);
        last = i;
    });

    return withDots;
};

const CATEGORY_LABELS = {
    Electronics: "Electronics",
    Fashion: "Fashion",
    Home: "Home",
};

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const page = Number(searchParams.get("page")) || 1;
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sort = searchParams.get("sort") || "newest";

    const [minPriceInput, setMinPriceInput] = useState(minPrice);
    const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

    useEffect(() => {
        setMinPriceInput(minPrice);
        setMaxPriceInput(maxPrice);
    }, [minPrice, maxPrice]);

    const { products, pages, loading, error } = useProducts(
        page,
        12,
        category,
        search,
        minPrice,
        maxPrice,
        sort,
    );

    const handleApplyFilters = () => {
        if (
            minPriceInput &&
            maxPriceInput &&
            Number(minPriceInput) > Number(maxPriceInput)
        ) {
            toast.error("Min Price must be less than Max Price");
            return;
        }

        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (category) params.set("category", category);
        if (minPriceInput) params.set("minPrice", minPriceInput);
        if (maxPriceInput) params.set("maxPrice", maxPriceInput);
        if (sort) params.set("sort", sort);

        params.set("page", "1");

        setSearchParams(params);
        setMobileFiltersOpen(false);
    };

    const handleCategoryChange = (value) => {
        setSearchParams({
            ...(search && { search }),
            ...(value && { category: value }),
            ...(minPrice && { minPrice }),
            ...(maxPrice && { maxPrice }),
            ...(sort && { sort }),
            page: "1",
        });
    };

    const handleSortChange = (value) => {
        setSearchParams({
            ...(search && { search }),
            ...(category && { category }),
            ...(minPrice && { minPrice }),
            ...(maxPrice && { maxPrice }),
            sort: value,
            page: "1",
        });
    };

    const handlePageChange = (newPage) => {
        setSearchParams({
            ...(search && { search }),
            ...(category && { category }),
            ...(minPrice && { minPrice }),
            ...(maxPrice && { maxPrice }),
            ...(sort && { sort }),
            page: String(newPage),
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const clearFilters = () => {
        setMinPriceInput("");
        setMaxPriceInput("");

        setSearchParams({
            ...(search && { search }),
            page: "1",
        });
    };

    // Individually removable filter chips
    const removeFilter = (key) => {
        const next = {
            ...(search && { search }),
            ...(category && { category }),
            ...(minPrice && { minPrice }),
            ...(maxPrice && { maxPrice }),
            ...(sort !== "newest" && { sort }),
            page: "1",
        };
        delete next[key];
        if (key === "price") {
            delete next.minPrice;
            delete next.maxPrice;
            setMinPriceInput("");
            setMaxPriceInput("");
        }
        setSearchParams(next);
    };

    const hasFilters =
        category || search || minPrice || maxPrice || sort !== "newest";

    const activeChips = [
        search && { key: "search", label: `"${search}"` },
        category && {
            key: "category",
            label: CATEGORY_LABELS[category] || category,
        },
        (minPrice || maxPrice) && {
            key: "price",
            label: `₹${minPrice || "0"} – ₹${maxPrice || "∞"}`,
        },
        sort !== "newest" && {
            key: "sort",
            label:
                sort === "price-low"
                    ? "Price: Low to High"
                    : "Price: High to Low",
        },
    ].filter(Boolean);

    const pageSequence = pages > 1 ? getPageSequence(page, pages) : [];

    return (
        <section className="min-h-screen bg-[#f7f3ec] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="mx-auto max-w-[1440px]">
                {/* =========================================
                    HEADER
                ========================================= */}
                <div className="mb-10 sm:mb-14">
                    <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c99a3d]">
                        <span className="h-px w-10 bg-[#c99a3d]" />
                        The Collection
                    </div>

                    <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <h1 className="font-serif text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#11151f] sm:text-6xl lg:text-[4.25rem]">
                            Explore
                            <span className="italic text-[#c99a3d]">
                                {" "}
                                Products.
                            </span>
                        </h1>

                        <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-end lg:gap-3">
                            <p className="max-w-sm text-sm leading-7 text-[#6f6b63] sm:text-base lg:text-right">
                                Discover products carefully selected for
                                quality, design and everyday living.
                            </p>

                            {/* {!loading && !error && (
                                <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-[#8b857c]">
                                    {products.length}{" "}
                                    {products.length === 1
                                        ? "product"
                                        : "products"}
                                </p>
                            )} */}
                        </div>
                    </div>
                </div>

                {/* =========================================
                    FILTER PANEL
                ========================================= */}
                <div className="sticky top-4 z-20 mb-10 sm:mb-14">
                    <div className="border border-[#d8d0c4] bg-[#eee8de]/95 backdrop-blur-sm">
                        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:gap-3 lg:p-5">
                            {/* Search */}
                            <form
                                className="lg:flex-1"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const value =
                                        e.currentTarget.elements.search.value.trim();

                                    setSearchParams({
                                        ...(value && { search: value }),
                                        ...(category && { category }),
                                        ...(minPrice && { minPrice }),
                                        ...(maxPrice && { maxPrice }),
                                        ...(sort && { sort }),
                                        page: "1",
                                    });
                                }}
                            >
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f887e]" />
                                    <Input
                                        name="search"
                                        placeholder="Search the collection..."
                                        defaultValue={search}
                                        className="h-12 rounded-none border-[#d4ccbf] bg-[#f7f3ec] pl-11 text-[#11151f] placeholder:text-[#aaa197] focus-visible:border-[#c99a3d] focus-visible:ring-[#c99a3d]"
                                    />
                                </div>
                            </form>

                            {/* Mobile filter toggle */}
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen((v) => !v)}
                                className="flex h-12 shrink-0 items-center justify-center gap-2 border border-[#d4ccbf] bg-[#f7f3ec] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#11151f] transition hover:border-[#c99a3d] lg:hidden"
                            >
                                <SlidersHorizontal className="h-4 w-4 text-[#c99a3d]" />
                                Filters
                                {hasFilters && (
                                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c99a3d] px-1 text-[10px] font-bold text-[#11151f]">
                                        {activeChips.length}
                                    </span>
                                )}
                            </button>

                            {/* Desktop-visible filter controls */}
                            <div
                                className={`${
                                    mobileFiltersOpen ? "flex" : "hidden"
                                } flex-col gap-4 lg:flex lg:flex-row lg:items-center lg:gap-3`}
                            >
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) =>
                                            handleCategoryChange(e.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-none border border-[#d4ccbf] bg-[#f7f3ec] px-4 pr-10 text-sm text-[#45413b] outline-none transition focus:border-[#c99a3d] lg:w-[170px]"
                                    >
                                        <option value="">All Categories</option>
                                        <option value="Electronics">
                                            Electronics
                                        </option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Home">Home</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8f887e]" />
                                </div>

                                <div className="relative">
                                    <select
                                        value={sort}
                                        onChange={(e) =>
                                            handleSortChange(e.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-none border border-[#d4ccbf] bg-[#f7f3ec] px-4 pr-10 text-sm text-[#45413b] outline-none transition focus:border-[#c99a3d] lg:w-[190px]"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="price-low">
                                            Price: Low to High
                                        </option>
                                        <option value="price-high">
                                            Price: High to Low
                                        </option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8f887e]" />
                                </div>

                                <div className="hidden h-8 w-px bg-[#d4ccbf] lg:block" />

                                <div className="flex items-center gap-3">
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="₹ Min"
                                        value={minPriceInput}
                                        onChange={(e) =>
                                            setMinPriceInput(e.target.value)
                                        }
                                        className="h-12 w-full rounded-none border-[#d4ccbf] bg-[#f7f3ec] focus-visible:border-[#c99a3d] focus-visible:ring-[#c99a3d] lg:w-[110px]"
                                    />
                                    <span className="text-[#aaa197]">—</span>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="₹ Max"
                                        value={maxPriceInput}
                                        onChange={(e) =>
                                            setMaxPriceInput(e.target.value)
                                        }
                                        className="h-12 w-full rounded-none border-[#d4ccbf] bg-[#f7f3ec] focus-visible:border-[#c99a3d] focus-visible:ring-[#c99a3d] lg:w-[110px]"
                                    />
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleApplyFilters}
                                    className="h-12 shrink-0 rounded-none bg-[#11151f] px-7 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#c99a3d]"
                                >
                                    Apply Filters
                                </Button>

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="flex shrink-0 items-center gap-1.5 self-start text-xs font-medium text-[#8b857c] transition-colors hover:text-[#a64b43] lg:self-auto"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Active filter chips */}
                        {activeChips.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 border-t border-[#d8d0c4] px-4 py-3 sm:px-5">
                                {activeChips.map((chip) => (
                                    <button
                                        key={chip.key}
                                        type="button"
                                        onClick={() => removeFilter(chip.key)}
                                        className="group flex items-center gap-1.5 border border-[#d4ccbf] bg-[#f7f3ec] py-1.5 pl-3 pr-2 text-xs font-medium text-[#45413b] transition hover:border-[#c99a3d]"
                                    >
                                        {chip.label}
                                        <X className="h-3 w-3 text-[#8f887e] transition group-hover:text-[#a64b43]" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* =========================================
                    LOADING
                ========================================= */}
                {loading && (
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden border border-[#ded8ce] bg-[#eee8de]"
                            >
                                <Skeleton className="h-72 w-full rounded-none bg-[#e3ddd2]" />
                                <div className="space-y-4 p-5">
                                    <Skeleton className="h-5 w-3/4 bg-[#ddd5c9]" />
                                    <Skeleton className="h-4 w-1/2 bg-[#ddd5c9]" />
                                    <Skeleton className="h-6 w-1/3 bg-[#ddd5c9]" />
                                    <Skeleton className="h-11 w-full rounded-none bg-[#ddd5c9]" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* =========================================
                    ERROR
                ========================================= */}
                {error && (
                    <div className="border border-[#d9b8b4] bg-[#f3e5e3] px-6 py-24 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a64b43]">
                            Something went wrong
                        </p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#11151f] sm:text-4xl">
                            We couldn't load the collection.
                        </h2>
                        <p className="mt-3 text-sm text-[#7d716b]">
                            Please try again in a moment.
                        </p>
                    </div>
                )}

                {/* =========================================
                    PRODUCTS
                ========================================= */}
                {!loading && !error && (
                    <>
                        {products.length === 0 ? (
                            <div className="border border-[#ded8ce] bg-[#eee8de] py-24 text-center">
                                <div className="mx-auto max-w-md px-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a3d]">
                                        No results
                                    </p>
                                    <h2 className="mt-4 font-serif text-3xl font-semibold text-[#11151f] sm:text-4xl">
                                        Nothing matched your search.
                                    </h2>
                                    <p className="mt-3 text-sm leading-6 text-[#6f6b63]">
                                        Try adjusting your category, price range
                                        or search term.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="mt-7 border border-[#11151f] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#11151f] transition hover:border-[#c99a3d] hover:text-[#c99a3d]"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Collection label */}
                                <div className="mb-7 flex items-center justify-between border-b border-[#ded8ce] pb-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6b63]">
                                        Curated for you
                                    </p>
                                    <p className="text-xs text-[#9b958c]">
                                        Page {page}
                                        {pages > 1 && ` of ${pages}`}
                                    </p>
                                </div>

                                {/* Product Grid */}
                                <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {products.map((product, index) => (
                                        <div
                                            key={product._id}
                                            style={{
                                                animation:
                                                    "fadeInUp 0.5s ease both",
                                                animationDelay: `${(index % 12) * 45}ms`,
                                            }}
                                        >
                                            <ProductCard {...product} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* =========================================
                    PAGINATION
                ========================================= */}
                {!loading && !error && pages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-1 border-t border-[#ded8ce] pt-10 sm:gap-2">
                        <button
                            type="button"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                            aria-label="Previous page"
                            className="mr-2 flex h-9 items-center gap-1.5 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6f6b63] transition hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-30 sm:mr-3"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        <div className="flex items-center gap-1">
                            {pageSequence.map((entry, i) =>
                                entry === "..." ? (
                                    <span
                                        key={`dots-${i}`}
                                        className="flex h-9 min-w-9 items-center justify-center text-xs text-[#aaa197]"
                                    >
                                        ···
                                    </span>
                                ) : (
                                    <button
                                        key={entry}
                                        type="button"
                                        onClick={() => handlePageChange(entry)}
                                        aria-current={
                                            entry === page ? "page" : undefined
                                        }
                                        className={`flex h-9 min-w-9 items-center justify-center px-3 text-xs font-semibold transition ${
                                            entry === page
                                                ? "bg-[#11151f] text-white"
                                                : "text-[#6f6b63] hover:bg-[#e3ddd2] hover:text-[#c99a3d]"
                                        }`}
                                    >
                                        {entry}
                                    </button>
                                ),
                            )}
                        </div>

                        <button
                            type="button"
                            disabled={page === pages}
                            onClick={() => handlePageChange(page + 1)}
                            aria-label="Next page"
                            className="ml-2 flex h-9 items-center gap-1.5 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6f6b63] transition hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-30 sm:ml-3"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;
