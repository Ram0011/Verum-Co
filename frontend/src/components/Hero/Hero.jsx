import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import HeroProductCard from "./HeroProductCard";
import { heroProducts } from "./hero.data";

const Hero = () => {
    const navigate = useNavigate();

    const positionClasses = {
        top: `
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            rotate-2
            z-20
        `,

        left: `
            absolute
            left-6
            top-1/2
            -translate-y-1/2
            -rotate-6
            z-10
        `,

        right: `
            absolute
            right-6
            top-[52%]
            -translate-y-1/2
            rotate-3
            z-10
        `,

        bottom: `
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            rotate-2
            z-10
        `,
    };

    return (
        <section className="overflow-hidden bg-[#f7f3ec]">
            <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1400px] items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
                {/* Left Content */}
                <div className="max-w-2xl">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                        <span className="h-px w-10 bg-[#c99a3d]" />
                        New Collection
                        <span className="text-[#8b857c]">/ Mid 2026</span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="mt-7 font-serif text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#11151f] sm:text-6xl lg:text-7xl"
                        style={{ marginTop: "1.25rem" }}
                    >
                        Curated pieces
                        <span className="block italic text-[#c99a3d]">
                            for everyday life.
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="mt-7 max-w-xl text-base leading-7 text-[#6f6b63] sm:text-lg"
                        style={{ marginTop: "1.5rem" }}
                    >
                        Discover thoughtfully selected products designed to
                        bring quality, style and character to the things you use
                        every day.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="group flex h-12 items-center gap-3 bg-[#11151f] px-7 text-sm font-semibold text-white transition hover:bg-[#242a36]"
                        >
                            Shop Collection
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="group flex h-12 items-center gap-2 border border-[#bdb5a9] px-7 text-sm font-semibold text-[#11151f] transition hover:border-[#c99a3d] hover:text-[#c99a3d]"
                        >
                            Explore
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>

                    {/* Trust */}
                    <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.14em] text-[#8b857c]">
                        <span>50,000+ Customers</span>

                        <span className="h-1 w-1 rounded-full bg-[#c99a3d]" />

                        <span>100% Authentic</span>

                        <span className="h-1 w-1 rounded-full bg-[#c99a3d]" />

                        <span>Secure Shopping</span>
                    </div>
                </div>

                {/* Right Product Composition */}
                <div className="relative flex min-h-[560px] items-center justify-center lg:min-h-[680px]">
                    {/* Decorative background */}
                    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8cfc1] sm:h-[520px] sm:w-[520px]" />

                    <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eee8de] sm:h-[420px] sm:w-[420px]" />

                    {/* Product cards */}
                    <div className="relative h-[560px] w-full max-w-[620px]">
                        {heroProducts.map((product) => (
                            <HeroProductCard
                                key={product.id}
                                image={product.image}
                                alt={product.alt}
                                size={product.size}
                                className={positionClasses[product.position]}
                            />
                        ))}
                    </div>

                    {/* Decorative label */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8b857c]">
                            Thoughtfully Selected
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
