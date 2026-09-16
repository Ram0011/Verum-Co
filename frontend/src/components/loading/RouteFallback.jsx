import { Spinner } from "./Spinner";
import { Shimmer } from "./Skeletons";

// Suspense fallback for lazy routes — centered, calm, on-brand.
const RouteFallback = ({ label = "Loading" }) => {
    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ec] px-6">
            <div className="flex flex-col items-center gap-5">
                <Spinner size={34} />
                <div className="flex flex-col items-center gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b857c]">
                        {label}
                    </p>
                    <Shimmer className="h-1.5 w-40 rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default RouteFallback;
