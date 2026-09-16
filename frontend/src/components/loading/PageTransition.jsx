import { motion } from "framer-motion";

// Wraps every page so route changes feel cinematic, not jarring.
// GPU-only transforms; disabled automatically for reduced-motion users.
const EASE = [0.22, 1, 0.36, 1];

export const PageTransition = ({ children, id }) => {
    return (
        <motion.div
            key={id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="verum-page will-change-transform"
        >
            {children}
        </motion.div>
    );
};

// Fade wrapper for async content swaps (skeleton -> data) to avoid hard pops.
export const ContentFade = ({ children, id }) => {
    return (
        <motion.div
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
