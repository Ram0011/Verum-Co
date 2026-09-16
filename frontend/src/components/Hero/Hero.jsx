import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";

import HeroProductCard from "./HeroProductCard";
import HeroAmbient from "../landing/HeroAmbient";
import { heroProducts } from "./hero.data";

const EASE = [0.22, 1, 0.36, 1];

const positionClasses = {
    top: "absolute top-0 left-1/2 -translate-x-1/2 rotate-2 z-20",
    left: "absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 -rotate-6 z-10",
    right: "absolute right-0 sm:right-6 top-[52%] -translate-y-1/2 rotate-3 z-10",
    bottom: "absolute bottom-4 left-1/2 -translate-x-1/2 rotate-2 z-10",
};

const parallaxDepth = { top: 14, left: 28, right: 24, bottom: 18 };

// One floating card: entrance (mount) → parallax (pointer) → float (idle loop).
// Three nested layers so the three transforms never fight each other.
const FloatingCard = ({ product, index, px, py, reduce }) => {
    const depth = parallaxDepth[product.position] ?? 18;
    const x = useTransform(px, (v) => v * depth);
    const y = useTransform(py, (v) => v * depth);

    const floatDuration = 5 + ((product.id * 7) % 4);

    return (
        <div className={positionClasses[product.position]}>
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 80, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.35 + index * 0.13,
                    ease: EASE,
                }}
            >
                <motion.div style={reduce ? undefined : { x, y }}>
                    <motion.div
                        animate={reduce ? undefined : { y: [0, -12, 0] }}
                        transition={
                            reduce
                                ? undefined
                                : {
                                      duration: floatDuration,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: 1.4 + index * 0.4,
                                  }
                        }
                    >
                        <HeroProductCard
                            image={product.image}
                            alt={product.alt}
                            size={product.size}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

// Masked line reveal for the headline.
const MaskedLine = ({ children, delay, className }) => (
    <span className={`block overflow-hidden pb-1 ${className ?? ""}`}>
        <motion.span
            className="block will-change-transform"
            initial={{ y: "112%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </motion.span>
    </span>
);

// Ease-out count-up for the trust stat.
const useCountUp = (target, duration = 1600, delay = 600) => {
    const reduce = useReducedMotion();
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (reduce) {
            node.textContent = `${target.toLocaleString("en-IN")}+`;
            return;
        }

        let raf;
        const startAt = performance.now() + delay;

        const tick = (now) => {
            const t = Math.min(Math.max((now - startAt) / duration, 0), 1);
            const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
            const value = Math.round(target * (t === 1 ? 1 : eased));
            node.textContent = `${value.toLocaleString("en-IN")}+`;
            if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, delay, reduce]);

    return ref;
};

const Hero = () => {
    const navigate = useNavigate();
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);

    const customersRef = useCountUp(50000);

    // Smooth pointer parallax (desktop pointers only).
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 55, damping: 16, mass: 0.6 });
    const sy = useSpring(py, { stiffness: 55, damping: 16, mass: 0.6 });

    const handlePointer = (e) => {
        if (reduce) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const resetPointer = () => {
        px.set(0);
        py.set(0);
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handlePointer}
            onMouseLeave={resetPointer}
            className="relative overflow-hidden bg-[#f7f3ec]"
        >
            <HeroAmbient />

            <div className="relative mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-[1400px] min-w-0 items-center gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
                {/* Left Content */}
                <div className="max-w-2xl">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                        <motion.span
                            className="h-px w-10 origin-left bg-[#c99a3d]"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, ease: EASE }}
                        />
                        <motion.span
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                        >
                            New Collection
                        </motion.span>
                        <motion.span
                            className="text-[#8b857c]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            / Mid 2026
                        </motion.span>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-7 font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#11151f] sm:text-6xl lg:text-7xl">
                        <MaskedLine delay={0.2}>Curated pieces</MaskedLine>
                        <MaskedLine
                            delay={0.32}
                            className="verum-headline-shine italic text-[#c99a3d]"
                        >
                            for everyday life.
                        </MaskedLine>
                    </h1>

                    {/* Description */}
                    <motion.p
                        className="mt-7 max-w-xl text-base leading-7 text-[#6f6b63] sm:text-lg"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                    >
                        Discover thoughtfully selected products designed to
                        bring quality, style and character to the things you use
                        every day.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className="mt-10 flex flex-wrap items-center gap-4"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
                    >
                        <motion.button
                            type="button"
                            onClick={() => navigate("/products")}
                            whileHover={reduce ? undefined : { y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="verum-btn-shine group relative flex h-12 items-center gap-3 overflow-hidden bg-[#11151f] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#242a36]"
                        >
                            Shop Collection
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={() => navigate("/products")}
                            whileHover={reduce ? undefined : { y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="group flex h-12 items-center gap-2 border border-[#bdb5a9] px-7 text-sm font-semibold text-[#11151f] transition hover:border-[#c99a3d] hover:text-[#c99a3d]"
                        >
                            Explore
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.button>
                    </motion.div>

                    {/* Trust */}
                    <motion.div
                        className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.14em] text-[#8b857c]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                    >
                        <span>
                            <span ref={customersRef}>0+</span> Customers
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#c99a3d]" />

                        <span>100% Authentic</span>

                        <span className="h-1 w-1 rounded-full bg-[#c99a3d]" />

                        <span>Secure Shopping</span>
                    </motion.div>
                </div>

                {/* Right Product Composition */}
                <div className="relative flex min-h-[480px] w-full min-w-0 items-center justify-center sm:min-h-[560px] lg:min-h-[680px]">
                    {/* Decorative background */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8cfc1] sm:h-[520px] sm:w-[520px]"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: EASE }}
                    />

                    <motion.div
                        className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eee8de] sm:h-[420px] sm:w-[420px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                    />

                    {/* Product cards */}
                    <div className="relative h-[460px] w-full min-w-0 max-w-[620px] sm:h-[560px]">
                        {heroProducts.map((product, i) => (
                            <FloatingCard
                                key={product.id}
                                product={product}
                                index={i}
                                px={sx}
                                py={sy}
                                reduce={reduce}
                            />
                        ))}
                    </div>

                    {/* Decorative label */}
                    <motion.div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8b857c]">
                            Thoughtfully Selected
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Scroll cue */}
            <motion.div
                className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                aria-hidden="true"
            >
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a39c90]">
                    Scroll
                </span>
                <span className="verum-scroll-dot block h-8 w-[1.5px] overflow-hidden bg-[#d8cfc1]">
                    <span className="verum-scroll-dot-inner block h-3 w-full bg-[#c99a3d]" />
                </span>
            </motion.div>
        </section>
    );
};

export default Hero;
