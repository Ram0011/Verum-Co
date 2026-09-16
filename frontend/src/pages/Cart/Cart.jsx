import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";

import EmptyCart from "@/components/Cart/EmptyCart";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import { CartSkeleton, ContentFade } from "@/components/loading";

const Cart = () => {
    const navigate = useNavigate();

    const { cart, loading, refetchCart } = useCart();

    if (loading) {
        return (
            <section className="min-h-screen bg-[#f7f3ec] px-6 py-16">
                <div className="mx-auto max-w-[1400px]">
                    <CartSkeleton />
                </div>
            </section>
        );
    }

    if (!cart || cart.items?.length === 0) {
        return <EmptyCart />;
    }

    return (
        <ContentFade id={`cart-${cart.items.length}`}>
        <section className="min-h-screen bg-[#f7f3ec] px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-12">
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f6b63] transition-colors hover:text-[#c99a3d]"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Continue Shopping
                    </button>

                    <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                                <span className="h-px w-8 bg-[#c99a3d]" />
                                Your Selection
                            </div>

                            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.025em] text-[#11151f] sm:text-5xl">
                                Your bag
                            </h1>
                        </div>

                        <p className="text-sm text-[#8b857c]">
                            {cart.items.length}{" "}
                            {cart.items.length === 1 ? "item" : "items"}
                        </p>
                    </div>
                </div>

                {/* Cart */}
                <div className="grid items-start gap-12 lg:grid-cols-[1fr_380px]">
                    {/* Items */}
                    <div>
                        {cart.items.map((item) => (
                            <CartItem
                                key={item.product._id}
                                item={item}
                                refetchCart={refetchCart}
                            />
                        ))}
                    </div>

                    {/* Summary */}
                    <CartSummary cart={cart} />
                </div>
            </div>
        </section>
        </ContentFade>
    );
};

export default Cart;
