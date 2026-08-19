import { ShieldCheck, Truck } from "lucide-react";

import { formatCurrency } from "@/utils/formatCurrency";

const OrderSummary = ({ cart }) => {
    const subtotal =
        cart?.items?.reduce(
            (total, item) =>
                total + Number(item.product.price || 0) * item.quantity,
            0,
        ) || 0;

    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <aside className="border border-[#d8d0c4] bg-[#eee8de] p-6 sm:p-8 lg:sticky lg:top-28">
            {/* Heading */}
            <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#c99a3d]" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a3d]">
                    Your selection
                </p>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#11151f]">
                Order Summary
            </h2>

            {/* Products */}
            <div className="mt-8 space-y-5">
                {cart?.items?.map((item) => (
                    <div key={item.product._id} className="flex gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-[#d4ccbf] bg-[#f7f3ec] p-2">
                            <img
                                src={item.product.images?.[0]?.url}
                                alt={item.product.name}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 font-serif text-base font-semibold leading-tight text-[#11151f]">
                                {item.product.name}
                            </p>

                            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#8b857c]">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-[#11151f]">
                            {formatCurrency(
                                Number(item.product.price || 0) * item.quantity,
                            )}
                        </p>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-[#cfc6b8]" />

            {/* Totals */}
            <div className="space-y-5">
                <div className="flex justify-between text-sm">
                    <span className="text-[#6f6b63]">Subtotal</span>

                    <span className="font-medium text-[#11151f]">
                        {formatCurrency(subtotal)}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-[#6f6b63]">Shipping</span>

                    <span className="font-semibold text-[#5f7d55]">FREE</span>
                </div>

                <div className="border-t border-[#cfc6b8] pt-5">
                    <div className="flex items-end justify-between gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#11151f]">
                            Total
                        </span>

                        <span className="text-2xl font-semibold text-[#11151f]">
                            {formatCurrency(total)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Trust */}
            <div className="mt-7 space-y-4 border-t border-[#cfc6b8] pt-6">
                <div className="flex items-center gap-3">
                    <Truck className="h-4 w-4 shrink-0 text-[#c99a3d]" />

                    <p className="text-xs leading-5 text-[#6f6b63]">
                        Free shipping on your order
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#c99a3d]" />

                    <p className="text-xs leading-5 text-[#6f6b63]">
                        Secure checkout and protected payment
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default OrderSummary;
