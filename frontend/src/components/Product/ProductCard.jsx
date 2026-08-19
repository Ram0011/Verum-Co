import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useWishlist from "@/hooks/useWishlist";
import { addToCart } from "@/api/cart.api";
import { formatCurrency } from "@/utils/formatCurrency";

const ProductCard = ({
    _id,
    name,
    images,
    price,
    originalPrice,
    rating,
    reviews,
    badge,
}) => {
    const navigate = useNavigate();

    const [isInWishlist, setIsInWishlist] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

    const { isInWishlist: checkInWishlist, toggleWishlist } = useWishlist();

    // Check if product is in wishlist on mount
    useEffect(() => {
        const checkWishlist = async () => {
            const inWishlist = await checkInWishlist(_id);
            setIsInWishlist(inWishlist);
        };
        checkWishlist();
    }, [_id, checkInWishlist]);

    const handleToggleWishlist = async (e) => {
        e.stopPropagation();

        try {
            const newState = await toggleWishlist(_id);

            setIsInWishlist(newState);

            toast.success(
                newState ? "Added to wishlist" : "Removed from wishlist",
            );
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message || "Failed to update wishlist",
            );
        }
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        try {
            setAddingToCart(true);

            await addToCart(_id, 1);

            toast.success("Added to cart");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message || "Failed to add to cart",
            );
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <article
            className="group cursor-pointer"
            onClick={() => navigate(`/product/${_id}`)}
        >
            {/* Image */}
            <div className="relative overflow-hidden border border-[#ded8ce] bg-[#eee8de]">
                {/* Badge */}
                {badge && (
                    <span className="absolute left-4 top-4 z-10 bg-[#11151f] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f7f3ec]">
                        {badge}
                    </span>
                )}

                {/* Wishlist */}
                <button
                    type="button"
                    aria-label={
                        isInWishlist
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                    onClick={handleToggleWishlist}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-[#d4ccbf] bg-[#f7f3ec]/90 text-[#11151f] backdrop-blur transition-all duration-300 hover:border-[#c99a3d]"
                >
                    <Heart
                        className={`h-4 w-4 transition-colors ${
                            isInWishlist
                                ? "fill-[#c99a3d] text-[#c99a3d]"
                                : "text-[#45413b]"
                        }`}
                    />
                </button>

                {/* Image */}
                <div className="flex h-72 items-center justify-center p-8">
                    <img
                        src={images?.[0]?.url}
                        alt={images?.[0]?.alt || name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Bottom image overlay */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#11151f]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Product information */}
            <div className="pt-5">
                {/* Product name */}
                <h3 className="line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-tight tracking-[-0.015em] text-[#11151f] transition-colors group-hover:text-[#c99a3d]">
                    {name}
                </h3>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-[#c99a3d] text-[#c99a3d]" />

                        <span className="text-xs font-semibold text-[#45413b]">
                            {rating || "—"}
                        </span>
                    </div>

                    {reviews !== undefined && (
                        <>
                            <span className="h-1 w-1 rounded-full bg-[#cfc6b8]" />

                            <span className="text-xs text-[#8b857c]">
                                {reviews} reviews
                            </span>
                        </>
                    )}
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center gap-3">
                    <span className="text-lg font-semibold text-[#11151f]">
                        {formatCurrency(Number(price || 0))}
                    </span>

                    {originalPrice && (
                        <span className="text-sm text-[#9b958c] line-through">
                            {formatCurrency(Number(originalPrice))}
                        </span>
                    )}
                </div>

                {/* Add to cart */}
                <button
                    type="button"
                    disabled={addingToCart}
                    onClick={handleAddToCart}
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 border border-[#11151f] bg-[#11151f] text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c99a3d] hover:border-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <ShoppingBag className="h-4 w-4" />

                    {addingToCart ? "Adding..." : "Add to bag"}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;