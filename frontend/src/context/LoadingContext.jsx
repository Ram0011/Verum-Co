import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import loadingBus from "@/lib/loadingBus";

const LoadingContext = createContext(null);

// Tunables — chosen to kill flicker and feel "world class":
const SHOW_DELAY_MS = 150; // don't flash loader for fast (<150ms) requests
const MIN_VISIBLE_MS = 350; // once shown, stay at least 350ms (no strobe)
const ROUTE_MIN_MS = 400; // route changes always animate ~400ms minimum

export const LoadingProvider = ({ children }) => {
    const location = useLocation();
    const [busy, setBusy] = useState(false); // raw bus state
    const [visible, setVisible] = useState(false); // debounced UI state
    const [booting, setBooting] = useState(true);
    const [routeChanging, setRouteChanging] = useState(false);

    const showTimer = useRef(null);
    const hideTimer = useRef(null);
    const shownAt = useRef(0);
    const firstRoute = useRef(true);

    // --- subscribe to global axios bus ---
    useEffect(() => {
        const unsub = loadingBus.subscribe((snap) => setBusy(snap.isLoading));
        setBusy(loadingBus.getSnapshot().isLoading);
        return unsub;
    }, []);

    // --- boot splash: show once on mount, fade out smoothly ---
    useEffect(() => {
        const t = setTimeout(() => setBooting(false), 900);
        return () => clearTimeout(t);
    }, []);

    // --- route-change shimmer: brief, always smooth ---
    useEffect(() => {
        if (firstRoute.current) {
            firstRoute.current = false;
            return;
        }
        setRouteChanging(true);
        const t = setTimeout(() => setRouteChanging(false), ROUTE_MIN_MS);
        return () => clearTimeout(t);
    }, [location.pathname, location.search]);

    // --- debounce busy -> visible (no flicker, no strobe) ---
    useEffect(() => {
        const clear = () => {
            if (showTimer.current) clearTimeout(showTimer.current);
            if (hideTimer.current) clearTimeout(hideTimer.current);
            showTimer.current = hideTimer.current = null;
        };

        if (busy) {
            if (hideTimer.current) clearTimeout(hideTimer.current);
            hideTimer.current = null;
            if (!visible && !showTimer.current) {
                showTimer.current = setTimeout(() => {
                    shownAt.current = Date.now();
                    setVisible(true);
                    showTimer.current = null;
                }, SHOW_DELAY_MS);
            }
        } else {
            if (showTimer.current) {
                clearTimeout(showTimer.current);
                showTimer.current = null;
            }
            if (visible) {
                const elapsed = Date.now() - shownAt.current;
                const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
                hideTimer.current = setTimeout(() => {
                    setVisible(false);
                    hideTimer.current = null;
                }, wait);
            }
        }

        return clear;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [busy]);

    const start = useCallback(() => loadingBus.start(), []);
    const stop = useCallback(() => loadingBus.stop(), []);

    // Wrap any promise so the bar/skeletons show automatically.
    const track = useCallback(async (promise) => {
        start();
        try {
            return await promise;
        } finally {
            stop();
        }
    }, [start, stop]);

    const value = useMemo(
        () => ({
            busy,
            isLoading: visible || routeChanging,
            apiLoading: visible,
            routeChanging,
            booting,
            start,
            stop,
            track,
        }),
        [busy, visible, routeChanging, booting, start, stop, track],
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const ctx = useContext(LoadingContext);
    if (!ctx) throw new Error("useLoading must be used inside LoadingProvider");
    return ctx;
};

export default LoadingContext;
