import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import useProduct from "@/hooks/useProduct";
import { useCart } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import { addToCart } from "@/api/cart.api";
import { ProductDetailSkeleton, ContentFade } from "@/components/loading";

import {
    ProductGallery,
    ProductInfo,
    QuantitySelector,
    ProductActions,
    ProductDescription,
} from "@/components/ProductDetails";

const Product = () => {
    const { id } = useParams();

    const [quantity, setQuantity] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const { product, loading, error } = useProduct(id);
    const { isInWishlist: checkInWishlist, toggleWishlist } =
        useWishlistContext();
    const { refetchCart } = useCart();

    // Reflect the saved wishlist state once the product has loaded.
    useEffect(() => {
        if (!product?._id) return;

        let ignore = false;

        checkInWishlist(product._id).then((inWishlist) => {
            if (!ignore) setIsInWishlist(inWishlist);
        });

        return () => {
            ignore = true;
        };
    }, [product?._id, checkInWishlist]);

    const handleAddToCart = async () => {
        try {
            await addToCart(product._id, quantity);
            await refetchCart();

            toast.success("Product added to cart");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to add product to cart",
            );

            throw error;
        }
    };

    const handleWishlist = async () => {
        try {
            const newState = await toggleWishlist(product._id);

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

    if (loading) {
        return (
            <section className="min-h-screen bg-[#f7f3ec] px-6 py-20">
                <div className="mx-auto max-w-[1400px]">
                    <ProductDetailSkeleton />
                </div>
            </section>
        );
    }

    if (error || !product) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ec] px-6">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a3d]">
                        Product unavailable
                    </p>

                    <h1 className="mt-4 font-serif text-4xl text-[#11151f]">
                        Something went wrong.
                    </h1>

                    <p className="mt-3 text-sm text-[#6f6b63]">
                        We couldn't load this product.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <ContentFade id={product._id}>
        <section className="min-h-screen bg-[#f7f3ec] px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-[1400px]">
                {/* Breadcrumb */}
                <div className="mb-10 flex min-w-0 flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#8b857c]">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-[#c99a3d]">{product.category}</span>
                </div>

                {/* Main */}
                <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                    {/* Gallery */}
                    <ProductGallery images={product.images} />

                    {/* Product Information */}
                    <div className="flex flex-col">
                        <ProductInfo product={product} />

                        {/* Wishlist */}
                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleWishlist}
                                className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6b63] transition-colors hover:text-[#c99a3d]"
                            >
                                <Heart
                                    className={`h-5 w-5 ${
                                        isInWishlist
                                            ? "fill-[#c99a3d] text-[#c99a3d]"
                                            : ""
                                    }`}
                                />

                                {isInWishlist
                                    ? "Saved to Wishlist"
                                    : "Add to Wishlist"}
                            </button>
                        </div>

                        {/* Quantity */}
                        <div className="mt-8">
                            <QuantitySelector
                                quantity={quantity}
                                setQuantity={setQuantity}
                                stock={product.stock}
                            />
                        </div>

                        {/* Actions */}
                        <ProductActions
                            stock={product.stock}
                            onAddToCart={handleAddToCart}
                        />

                        {/* Small reassurance */}
                        <div className="mt-6 border-t border-[#ded8ce] pt-5">
                            <p className="text-xs leading-6 text-[#8b857c]">
                                Secure checkout · Authentic products · Carefully
                                packaged
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <ProductDescription description={product.description} />
            </div>
        </section>
        </ContentFade>
    );
};

export default Product;