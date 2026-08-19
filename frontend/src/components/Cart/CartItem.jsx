import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { formatCurrency } from "@/utils/formatCurrency";
import { updateCartQuantity, removeFromCart } from "@/api/cart.api";

const CartItem = ({ item, refetchCart }) => {
    const increaseQuantity = async () => {
        try {
            await updateCartQuantity(item.product._id, item.quantity + 1);

            toast.success("Quantity updated");
            await refetchCart();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to update quantity",
            );
        }
    };

    const decreaseQuantity = async () => {
        if (item.quantity === 1) return;

        try {
            await updateCartQuantity(item.product._id, item.quantity - 1);

            toast.success("Quantity updated");
            await refetchCart();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to update quantity",
            );
        }
    };

    const removeItem = async () => {
        try {
            await removeFromCart(item.product._id);

            toast.success("Item removed from cart");
            await refetchCart();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to remove item",
            );
        }
    };

    const price = Number(item.product.price || 0);
    const itemTotal = price * item.quantity;

    return (
        <article className="border-b border-[#ded8ce] py-7 first:pt-0">
            <div className="flex gap-5 sm:gap-7">
                {/* Product Image */}
                <button
                    type="button"
                    className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden border border-[#ded8ce] bg-[#eee8de] sm:h-36 sm:w-36"
                >
                    <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.images?.[0]?.alt || item.product.name}
                        className="h-full w-full object-contain p-3 transition-transform duration-300 hover:scale-105"
                    />
                </button>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                        {/* Category */}
                        {item.product.category && (
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c99a3d]">
                                {item.product.category}
                            </p>
                        )}

                        {/* Name */}
                        <h3 className="mt-2 line-clamp-2 font-serif text-xl font-semibold leading-tight text-[#11151f] sm:text-2xl">
                            {item.product.name}
                        </h3>

                        {/* Price */}
                        <p className="mt-3 text-sm font-medium text-[#45413b]">
                            {formatCurrency(price)}
                            <span className="ml-2 text-xs text-[#8b857c]">
                                each
                            </span>
                        </p>
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        {/* Quantity */}
                        <div className="flex h-10 items-center border border-[#cfc6b8] bg-[#f7f3ec]">
                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={item.quantity === 1}
                                aria-label="Decrease quantity"
                                className="flex h-full w-10 items-center justify-center text-[#11151f] transition hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Minus className="h-3.5 w-3.5" />
                            </button>

                            <span className="flex h-full min-w-10 items-center justify-center border-x border-[#cfc6b8] text-sm font-semibold text-[#11151f]">
                                {item.quantity}
                            </span>

                            <button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={item.quantity >= item.product.stock}
                                aria-label="Increase quantity"
                                className="flex h-full w-10 items-center justify-center text-[#11151f] transition hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Plus className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Remove */}
                        <button
                            type="button"
                            onClick={removeItem}
                            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8b857c] transition-colors hover:text-[#a64b43]"
                        >
                            <Trash2 className="h-4 w-4" />
                            Remove
                        </button>
                    </div>
                </div>

                {/* Item Total */}
                <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-lg font-semibold text-[#11151f]">
                        {formatCurrency(itemTotal)}
                    </p>
                </div>
            </div>

            {/* Mobile Item Total */}
            <div className="mt-4 flex justify-end sm:hidden">
                <p className="text-sm font-semibold text-[#11151f]">
                    {formatCurrency(itemTotal)}
                </p>
            </div>
        </article>
    );
};

export default CartItem;