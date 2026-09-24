import { useEffect, useRef, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

// Buttery top progress bar: eased trickle to 90%, springs to 100% on done.
// GPU-only (scaleX), fixed, non-blocking, respects reduced motion.
const TopProgressBar = () => {
    const { isLoading } = useLoading();
    const [progress, setProgress] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const raf = useRef(null);
    const value = useRef(0);

    useEffect(() => {
        const stop = () => {
            if (raf.current) cancelAnimationFrame(raf.current);
            raf.current = null;
        };

        if (isLoading) {
            setLeaving(false);
            setProgress((p) => (p === 0 ? 0.06 : p));

            const tick = () => {
                // ease-out trickle toward 0.9 — fast at start, slow at end
                value.current += (0.9 - value.current) * 0.06 + 0.003;
                if (value.current > 0.9) value.current = 0.9;
                setProgress(value.current);
                raf.current = requestAnimationFrame(tick);
            };

            stop();
            raf.current = requestAnimationFrame(tick);
        } else {
            stop();
            if (value.current > 0 || progress > 0) {
                value.current = 1;
                setProgress(1);
                const t = setTimeout(() => {
                    setLeaving(true);
                    const t2 = setTimeout(() => {
                        value.current = 0;
                        setProgress(0);
                        setLeaving(false);
                    }, 350);
                    return () => clearTimeout(t2);
                }, 150);
                return () => clearTimeout(t);
            }
        }

        return stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (progress === 0 && !isLoading) return null;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]"
        >
            <div
                className="verum-progress-fill h-full origin-left"
                style={{
                    transform: `scaleX(${progress})`,
                    opacity: leaving ? 0 : 1,
                }}
            />
            <div
                className="verum-progress-glow"
                style={{
                    transform: `scaleX(${progress})`,
                    opacity: leaving ? 0 : 1,
                }}
            />
        </div>
    );
};

export default TopProgressBar;
