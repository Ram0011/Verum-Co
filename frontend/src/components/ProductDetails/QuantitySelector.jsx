import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity, setQuantity, stock }) => {
    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increase = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6b63]">
                Quantity
            </p>

            <div className="flex h-12 w-fit items-center border border-[#cfc6b8] bg-[#f7f3ec]">
                <button
                    type="button"
                    onClick={decrease}
                    disabled={quantity <= 1}
                    className="flex h-full w-12 items-center justify-center text-[#11151f] transition hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-30"
                >
                    <Minus className="h-4 w-4" />
                </button>

                <span className="flex h-full min-w-12 items-center justify-center border-x border-[#cfc6b8] text-sm font-semibold text-[#11151f]">
                    {quantity}
                </span>

                <button
                    type="button"
                    onClick={increase}
                    disabled={quantity >= stock}
                    className="flex h-full w-12 items-center justify-center text-[#11151f] transition hover:text-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-30"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
