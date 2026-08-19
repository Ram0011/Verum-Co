import { Heart } from "lucide-react";
import { toast } from "sonner";

import { getWishlist, removeFromWishlist } from "@/api/wishlist.api";

import { addToCart } from "@/api/cart.api";

import { WishlistCard, EmptyWishlist } from "@/components/Wishlist";

import { useEffect, useState } from "react";

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            setLoading(true);

            const data = await getWishlist();

            setProducts(data.products || []);
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message || "Failed to load wishlist",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        try {
            await removeFromWishlist(productId);

            setProducts((current) =>
                current.filter((product) => product._id !== productId),
            );

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
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-slate-500">Loading wishlist...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return <EmptyWishlist />;
    }

    return (
        <section className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3">
                        <Heart className="h-7 w-7 fill-indigo-600 text-indigo-600" />

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
    );
};

export default Wishlist;