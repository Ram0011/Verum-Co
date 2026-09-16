import { cn } from "@/lib/utils";

// World-class dual-ring spinner — GPU only (transform/opacity), no layout thrash.
export const Spinner = ({ size = 20, className, tone = "current" }) => {
    return (
        <span
            role="status"
            aria-label="Loading"
            className={cn("verum-spinner", className)}
            style={{ width: size, height: size }}
            data-tone={tone}
        >
            <span className="verum-spinner-ring" />
            <span className="verum-spinner-arc" />
        </span>
    );
};

// Small inline dots for text buttons / optimistic states.
export const TypingDots = ({ className }) => {
    return (
        <span className={cn("verum-dots", className)} aria-hidden="true">
            <span />
            <span />
            <span />
        </span>
    );
};

// Drop-in button loading content: spinner + label with smooth swap.
export const ButtonLoader = ({ label = "Loading", size = 16 }) => {
    return (
        <span className="inline-flex items-center justify-center gap-2">
            <Spinner size={size} />
            <span className="verum-fade-in">{label}</span>
        </span>
    );
};

export default Spinner;
