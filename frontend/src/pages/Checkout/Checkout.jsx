import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";
import { createOrder } from "@/api/order.api";

import { CheckoutForm, OrderSummary } from "@/components/Checkout";

import EmptyCart from "@/components/Cart/EmptyCart";

const Checkout = () => {
    const navigate = useNavigate();

    const { cart, loading: cartLoading } = useCart();

    const [placingOrder, setPlacingOrder] = useState(false);

    const handlePlaceOrder = async (shippingAddress) => {
        try {
            setPlacingOrder(true);

            await createOrder(shippingAddress);

            toast.success("Order placed successfully!");

            navigate("/orders");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message || "Failed to place order",
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    if (cartLoading) {
        return (
            <section className="min-h-[70vh] bg-[#f7f3ec] px-6 py-16">
                <div className="mx-auto max-w-[1400px] animate-pulse">
                    <div className="h-4 w-24 bg-[#e3ddd2]" />

                    <div className="mt-6 h-12 w-72 bg-[#e3ddd2]" />

                    <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px]">
                        <div className="h-[600px] bg-[#eee8de]" />

                        <div className="h-[500px] bg-[#eee8de]" />
                    </div>
                </div>
            </section>
        );
    }

    if (!cart || cart.items?.length === 0) {
        return <EmptyCart />;
    }

    return (
        <section className="min-h-screen bg-[#f7f3ec] px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-[1400px]">
                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f6b63] transition-colors hover:text-[#c99a3d]"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Bag
                </button>

                {/* Header */}
                <div className="mt-10 mb-12">
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                        <span className="h-px w-8 bg-[#c99a3d]" />
                        Secure Checkout
                    </div>

                    <h1 className="mt-5 font-serif text-5xl font-semibold tracking-[-0.025em] text-[#11151f] sm:text-6xl">
                        Complete your
                        <span className="italic text-[#c99a3d]"> order.</span>
                    </h1>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-[#6f6b63] sm:text-base">
                        Enter your delivery details and review your selection
                        before placing your order.
                    </p>
                </div>

                {/* Checkout */}
                <div className="grid items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
                    {/* Form */}
                    <div>
                        <CheckoutForm
                            onSubmit={handlePlaceOrder}
                            loading={placingOrder}
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <OrderSummary cart={cart} />
                    </div>
                </div>

                {/* Security note */}
                <div className="mt-10 flex items-center justify-center gap-2 text-xs text-[#8b857c]">
                    <LockKeyhole className="h-3.5 w-3.5 text-[#c99a3d]" />
                    Secure checkout · Your information is protected
                </div>
            </div>
        </section>
    );
};

export default Checkout;
