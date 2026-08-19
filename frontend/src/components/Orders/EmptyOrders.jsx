import { ArrowRight, PackageOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyOrders = () => {
    const navigate = useNavigate();

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ec] px-6 py-20">
            <div className="max-w-lg text-center">
                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#d8d0c4] bg-[#eee8de]">
                    <PackageOpen className="h-8 w-8 text-[#c99a3d]" />
                </div>

                {/* Eyebrow */}
                <div className="mt-8 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a3d]">
                    <span className="h-px w-6 bg-[#c99a3d]" />
                    Your Account
                    <span className="h-px w-6 bg-[#c99a3d]" />
                </div>

                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.025em] text-[#11151f] sm:text-5xl">
                    No orders yet.
                </h1>

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#6f6b63] sm:text-base">
                    You haven't placed an order yet. Explore our collection and
                    find something worth bringing home.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="group mx-auto mt-8 flex items-center gap-3 bg-[#11151f] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#c99a3d]"
                >
                    Start Shopping
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>
        </section>
    );
};

export default EmptyOrders;
