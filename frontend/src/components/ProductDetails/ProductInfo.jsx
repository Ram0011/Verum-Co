import { Star } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

const ProductInfo = ({ product }) => {
    const rating = Number(product.rating || 0);

    return (
        <div className="space-y-7">
            {/* Category */}
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#c99a3d]">
                <span className="h-px w-8 bg-[#c99a3d]" />
                {product.category || "Collection"}
            </div>

            {/* Product Name */}
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-[-0.025em] text-[#11151f] sm:text-5xl">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            className={`h-4 w-4 ${
                                index < Math.round(rating)
                                    ? "fill-[#c99a3d] text-[#c99a3d]"
                                    : "text-[#d2cbc0]"
                            }`}
                        />
                    ))}
                </div>

                <span className="text-sm font-semibold text-[#45413b]">
                    {rating.toFixed(1)}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#cfc6b8]" />

                <span className="text-sm text-[#8b857c]">
                    {product.reviews || 0} reviews
                </span>
            </div>

            {/* Price */}
            <div className="border-y border-[#ded8ce] py-6">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-3xl font-semibold text-[#11151f] sm:text-4xl">
                        {formatCurrency(Number(product.price || 0))}
                    </span>

                    {product.originalPrice && (
                        <span className="text-base text-[#9b958c] line-through">
                            {formatCurrency(Number(product.originalPrice))}
                        </span>
                    )}

                    {product.badge && (
                        <span className="bg-[#11151f] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f7f3ec]">
                            {product.badge}
                        </span>
                    )}
                </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-3">
                <span
                    className={`h-2.5 w-2.5 rounded-full ${
                        product.stock > 0 ? "bg-[#6d8b62]" : "bg-[#a64b43]"
                    }`}
                />

                <span
                    className={`text-sm font-medium ${
                        product.stock > 0 ? "text-[#5f7d55]" : "text-[#a64b43]"
                    }`}
                >
                    {product.stock > 0
                        ? `In stock — ${product.stock} available`
                        : "Currently unavailable"}
                </span>
            </div>
        </div>
    );
};

export default ProductInfo;
