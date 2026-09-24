import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";

const WishlistCard = ({ product, onRemove, onAddToCart }) => {
    const navigate = useNavigate();

    return (
        <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Image */}
            <div
                className="relative cursor-pointer bg-slate-50 p-6"
                onClick={() => navigate(`/product/${product._id}`)}
            >
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(product._id);
                    }}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-md transition hover:scale-110"
                >
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>

                <div className="flex h-48 items-center justify-center sm:h-56">
                    <img
                        src={product.images?.[0]?.url}
                        alt={product.images?.[0]?.alt || product.name}
                        className="h-40 w-full object-contain transition duration-300 group-hover:scale-105 sm:h-48"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-5">
                <h3
                    className="line-clamp-2 cursor-pointer text-lg font-semibold text-slate-900"
                    onClick={() => navigate(`/product/${product._id}`)}
                >
                    {product.name}
                </h3>

                <div className="flex items-center justify-between gap-2">
                    <span className="text-xl font-bold text-slate-900 sm:text-2xl">
                        {formatCurrency(Number(product.price || 0))}
                    </span>

                    <span
                        className={`text-sm font-medium ${
                            product.stock > 0
                                ? "text-green-600"
                                : "text-red-500"
                        }`}
                    >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                <div className="flex flex-col gap-2 min-[420px]:flex-row">
                    <Button
                        className="flex-1 rounded-xl"
                        disabled={product.stock <= 0}
                        onClick={() => onAddToCart(product)}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>

                    <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => onRemove(product._id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;
