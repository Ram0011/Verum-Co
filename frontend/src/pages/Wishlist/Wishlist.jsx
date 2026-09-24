import { Heart } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import { addToCart } from "@/api/cart.api";

import { WishlistCard, EmptyWishlist } from "@/components/Wishlist";
import { WishlistSkeleton, ContentFade, Spinner } from "@/components/loading";

const Wishlist = () => {
    const { wishlist, loading, refetchWishlist, toggleWishlist } = useWishlistContext();
    const { refetchCart } = useCart();

    const products = wishlist?.products || [];

    const handleRemove = async (productId) => {
        try {
            await toggleWishlist(productId);
            await refetchWishlist();

            toast.success("Removed from wishlist");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message || "Failed to remove product",
            );
        }
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product._id, 1);
            await refetchCart();

            toast.success("Product added to cart");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to add product to cart",
            );
        }
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-[#f7f3ec] px-6 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex items-center gap-3">
                        <Spinner size={22} />
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8b857c]">
                            Loading wishlist
                        </p>
                    </div>
                    <WishlistSkeleton count={8} />
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return <EmptyWishlist />;
    }

    return (
        <ContentFade id={`wishlist-${products.length}`}>
        <section className="min-h-screen bg-[#f7f3ec] px-6 py-12">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3">
                        <Heart className="h-7 w-7 fill-red-800 text-red-800" />

                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            My Wishlist
                        </h1>
                    </div>

                    <p className="mt-3 text-slate-500">
                        {products.length}{" "}
                        {products.length === 1 ? "product" : "products"} saved
                        for later.
                    </p>
                </div>

                {/* Products */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <WishlistCard
                            key={product._id}
                            product={product}
                            onRemove={handleRemove}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </section>
        </ContentFade>
    );
};

export default Wishlist;
