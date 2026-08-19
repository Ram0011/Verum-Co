import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts";

const ProductSection = () => {
    const navigate = useNavigate();

    const params = useMemo(
        () => ({
            limit: 8,
        }),
        [],
    );

    const { products, loading, error } = useProducts(params);

    if (loading) {
        return (
            <section className="bg-[#f7f3ec] py-24">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                    <div className="mb-12">
                        <div className="h-3 w-28 animate-pulse bg-[#e3ddd2]" />

                        <div className="mt-5 h-10 w-72 animate-pulse bg-[#e3ddd2]" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse border border-[#ded8ce] bg-[#eee8de]"
                            >
                                <div className="h-72 bg-[#e5dfd5]" />

                                <div className="space-y-4 p-5">
                                    <div className="h-5 w-3/4 bg-[#ddd6ca]" />
                                    <div className="h-4 w-1/2 bg-[#ddd6ca]" />
                                    <div className="h-7 w-1/3 bg-[#ddd6ca]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-[#f7f3ec] py-24 text-center">
                <p className="text-sm text-[#8b4038]">
                    Failed to load products.
                </p>
            </section>
        );
    }

    return (
        <section className="bg-[#f7f3ec] py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Heading */}
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                            <span className="h-px w-10 bg-[#c99a3d]" />
                            Our Selection
                        </div>

                        <h2 className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-[-0.025em] text-[#11151f] sm:text-5xl">
                            Featured
                            <span className="italic text-[#c99a3d]">
                                {" "}
                                collection.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-lg text-sm leading-6 text-[#6f6b63] sm:text-base">
                            A selection of products we think deserve a place in
                            your everyday.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="group flex w-fit items-center gap-2 border-b border-[#c99a3d] pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#11151f] transition-colors hover:text-[#c99a3d]"
                    >
                        View all products
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Products */}
                {products.length === 0 ? (
                    <div className="border border-[#ded8ce] py-20 text-center">
                        <p className="text-sm text-[#6f6b63]">
                            No featured products available.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product._id} {...product} />
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                {products.length > 0 && (
                    <div className="mt-14 flex justify-center">
                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="group flex items-center gap-3 border border-[#bdb5a9] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#11151f] transition-all hover:border-[#c99a3d] hover:text-[#c99a3d]"
                        >
                            Explore the collection
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductSection;
