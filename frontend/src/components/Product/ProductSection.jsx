import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts";
import Reveal from "@/components/landing/Reveal";
import {
    ProductGridSkeleton,
    SectionHeaderSkeleton,
    ContentFade,
} from "@/components/loading";

const ProductSection = () => {
    const navigate = useNavigate();

    // Featured section shows the first 8 products (page 1, limit 8).
    const { products, loading, error } = useProducts(1, 8);

    if (loading) {
        return (
            <section className="bg-[#f7f3ec] py-14 sm:py-24">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                    <div className="mb-12">
                        <SectionHeaderSkeleton />
                    </div>

                    <ProductGridSkeleton count={8} />
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
        <section className="bg-[#f7f3ec] py-14 sm:py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Heading */}
                <Reveal className="mb-14">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
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
                                A selection of products we think deserve a place
                                in your everyday.
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
                </Reveal>

                {/* Products */}
                {products.length === 0 ? (
                    <div className="border border-[#ded8ce] py-20 text-center">
                        <p className="text-sm text-[#6f6b63]">
                            No featured products available.
                        </p>
                    </div>
                ) : (
                    <ContentFade id="featured-products">
                        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product, i) => (
                                <Reveal
                                    key={product._id}
                                    delay={(i % 4) * 0.08}
                                    y={36}
                                >
                                    <ProductCard {...product} />
                                </Reveal>
                            ))}
                        </div>
                    </ContentFade>
                )}

                {/* Bottom CTA */}
                {products.length > 0 && (
                    <Reveal className="mt-14 flex justify-center">
                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="group flex items-center gap-3 border border-[#bdb5a9] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#11151f] transition-all hover:border-[#c99a3d] hover:text-[#c99a3d]"
                        >
                            Explore the collection
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Reveal>
                )}
            </div>
        </section>
    );
};

export default ProductSection;
