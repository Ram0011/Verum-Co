import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

// Full-screen boot splash — brand mark with staggered reveal, then buttery exit.
// Shows once per app load (~900ms) and whenever route+api are both changing.
const GlobalLoader = () => {
    const { booting } = useLoading();
    const show = booting;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-[#f7f3ec]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                    aria-hidden="true"
                >
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="text-3xl tracking-tight text-[#11151f]"
                                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                            >
                                Verum & Co.
                            </span>
                            <span className="mt-1 h-2 w-2 rounded-full bg-[#c99a3d] verum-pulse-dot" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b857c]"
                        >
                            Curating
                        </motion.p>

                        {/* slim loading line */}
                        <div className="mt-8 h-[2px] w-44 overflow-hidden rounded-full bg-[#e3ddd2]">
                            <motion.div
                                className="h-full w-1/3 rounded-full bg-[#c99a3d]"
                                animate={{ x: ["-100%", "300%"] }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoader;
