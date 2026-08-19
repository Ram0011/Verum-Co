import { ArrowRight, ShoppingBag, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductActions = ({ onAddToCart, stock }) => {
    const navigate = useNavigate();

    const handleBuyNow = async () => {
        try {
            await onAddToCart();
            navigate("/cart");
        } catch (error) {
            console.error(error);
        }
    };

    const disabled = stock <= 0;

    return (
        <div className="mt-8 space-y-3">
            <button
                type="button"
                disabled={disabled}
                onClick={onAddToCart}
                className="group flex h-13 w-full items-center justify-center gap-3 bg-[#11151f] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ShoppingBag className="h-4 w-4" />

                {disabled ? "Out of Stock" : "Add to Bag"}

                {!disabled && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={handleBuyNow}
                className="flex h-13 w-full items-center justify-center gap-3 border border-[#11151f] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#11151f] transition-all duration-300 hover:border-[#c99a3d] hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-50"
            >
                <Zap className="h-4 w-4" />
                Buy Now
            </button>
        </div>
    );
};

export default ProductActions;
