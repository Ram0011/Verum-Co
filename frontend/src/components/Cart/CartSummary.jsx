import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "@/utils/formatCurrency";

const CartSummary = ({ cart }) => {
    const navigate = useNavigate();

    const subtotal =
        cart?.items?.reduce((total, item) => {
            return total + Number(item.product.price || 0) * item.quantity;
        }, 0) || 0;

    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <aside className="border border-[#d8d0c4] bg-[#eee8de] p-6 sm:p-8 lg:sticky lg:top-28">
            {/* Heading */}
            <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#c99a3d]" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a3d]">
                    Your order
                </p>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#11151f]">
                Order Summary
            </h2>

            {/* Price Breakdown */}
            <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6f6b63]">Subtotal</span>

                    <span className="font-medium text-[#11151f]">
                        {formatCurrency(subtotal)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6f6b63]">Shipping</span>

                    <span className="font-semibold text-[#5f7d55]">FREE</span>
                </div>

                <div className="border-t border-[#cfc6b8] pt-5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#11151f]">
                            Total
                        </span>

                        <span className="text-2xl font-semibold text-[#11151f]">
                            {formatCurrency(total)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Checkout */}
            <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="group mt-8 flex h-13 w-full items-center justify-center gap-3 bg-[#11151f] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#c99a3d]"
            >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Trust */}
            <div className="mt-7 space-y-4 border-t border-[#cfc6b8] pt-6">
                <div className="flex items-center gap-3">
                    <Truck className="h-4 w-4 text-[#c99a3d]" />

                    <span className="text-xs text-[#6f6b63]">
                        Free shipping on your order
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-[#c99a3d]" />

                    <span className="text-xs text-[#6f6b63]">
                        Secure and protected checkout
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default CartSummary;
