import { cn } from "@/lib/utils";

// Base shimmer block — the heart of the world-class feel.
// Uses a sweeping gradient (transform-only) instead of opacity pulse.
export const Shimmer = ({ className }) => (
    <div aria-hidden="true" className={cn("verum-shimmer", className)} />
);

const staggerStyle = (index, base = 45) => ({
    animationDelay: `${Math.min(index * base, 400)}ms`,
});

// ---- Presets (match brand palette) ----

export const ProductGridSkeleton = ({ count = 8, className }) => (
    <div className={cn("grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4", className)}>
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="verum-skeleton-card overflow-hidden border border-[#ded8ce] bg-[#eee8de]"
                style={staggerStyle(i)}
            >
                <Shimmer className="h-72 w-full" />
                <div className="space-y-3 p-5">
                    <Shimmer className="h-5 w-3/4" />
                    <Shimmer className="h-4 w-1/2" />
                    <Shimmer className="h-6 w-1/3" />
                    <Shimmer className="h-11 w-full" />
                </div>
            </div>
        ))}
    </div>
);

export const ProductsPageSkeleton = ({ count = 12 }) => (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="verum-skeleton-card overflow-hidden border border-[#ded8ce] bg-[#eee8de]"
                style={staggerStyle(i)}
            >
                <Shimmer className="h-72 w-full" />
                <div className="space-y-4 p-5">
                    <Shimmer className="h-5 w-3/4" />
                    <Shimmer className="h-4 w-1/2" />
                    <Shimmer className="h-6 w-1/3" />
                    <Shimmer className="h-11 w-full" />
                </div>
            </div>
        ))}
    </div>
);

export const ProductDetailSkeleton = () => (
    <div className="grid gap-12 lg:grid-cols-2">
        <div className="verum-skeleton-card overflow-hidden">
            <Shimmer className="h-[420px] w-full sm:h-[600px]" />
        </div>
        <div className="space-y-5">
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-12 w-3/4" />
            <Shimmer className="h-5 w-1/3" />
            <Shimmer className="h-24 w-full" />
            <Shimmer className="h-12 w-40" />
            <Shimmer className="h-13 w-full" />
        </div>
    </div>
);

export const CartSkeleton = () => (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-7">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="verum-skeleton-card flex gap-6 border-b border-[#ded8ce] pb-7"
                    style={staggerStyle(i, 70)}
                >
                    <Shimmer className="h-36 w-36 shrink-0" />
                    <div className="flex-1 space-y-4">
                        <Shimmer className="h-5 w-1/2" />
                        <Shimmer className="h-4 w-1/4" />
                        <Shimmer className="h-10 w-32" />
                    </div>
                </div>
            ))}
        </div>
        <Shimmer className="h-96 w-full" />
    </div>
);

export const OrdersSkeleton = () => (
    <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="verum-skeleton-card" style={staggerStyle(i, 70)}>
                <Shimmer className="h-56 w-full" />
            </div>
        ))}
    </div>
);

export const CheckoutSkeleton = () => (
    <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <Shimmer className="h-[600px] w-full" />
        <Shimmer className="h-[500px] w-full" />
    </div>
);

export const WishlistSkeleton = ({ count = 8 }) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="verum-skeleton-card overflow-hidden border border-[#ded8ce] bg-[#eee8de]"
                style={staggerStyle(i)}
            >
                <Shimmer className="h-64 w-full" />
                <div className="space-y-3 p-5">
                    <Shimmer className="h-5 w-2/3" />
                    <Shimmer className="h-4 w-1/3" />
                    <Shimmer className="h-10 w-full" />
                </div>
            </div>
        ))}
    </div>
);

export const SectionHeaderSkeleton = () => (
    <div>
        <Shimmer className="h-3 w-28" />
        <Shimmer className="mt-5 h-10 w-72" />
    </div>
);

export default Shimmer;
