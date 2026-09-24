import { ArrowRight, ShoppingBag, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLoader } from "@/components/loading";

const ProductActions = ({ onAddToCart, stock }) => {
    const navigate = useNavigate();
    const [busy, setBusy] = useState(null); // 'cart' | 'buy' | null

    const handleAdd = async () => {
        if (busy) return;
        try {
            setBusy("cart");
            await onAddToCart();
        } catch (error) {
            console.error(error);
        } finally {
            setBusy(null);
        }
    };

    const handleBuyNow = async () => {
        if (busy) return;
        try {
            setBusy("buy");
            await onAddToCart();
            navigate("/cart");
        } catch (error) {
            console.error(error);
            setBusy(null);
        }
    };

    const disabled = stock <= 0;

    return (
        <div className="mt-8 space-y-3">
            <button
                type="button"
                disabled={disabled || busy !== null}
                onClick={handleAdd}
                className="group flex h-13 w-full items-center justify-center gap-3 bg-[#11151f] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {busy === "cart" ? (
                    <ButtonLoader label="Adding..." />
                ) : (
                    <>
                        <ShoppingBag className="h-4 w-4" />
                        {disabled ? "Out of Stock" : "Add to Bag"}
                        {!disabled && (
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        )}
                    </>
                )}
            </button>

            <button
                type="button"
                disabled={disabled || busy !== null}
                onClick={handleBuyNow}
                className="flex h-13 w-full items-center justify-center gap-3 border border-[#11151f] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#11151f] transition-all duration-300 hover:border-[#c99a3d] hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {busy === "buy" ? (
                    <ButtonLoader label="Processing..." />
                ) : (
                    <>
                        <Zap className="h-4 w-4" />
                        Buy Now
                    </>
                )}
            </button>
        </div>
    );
};

export default ProductActions;
