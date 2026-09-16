// Tiny singleton that tracks in-flight async work WITHOUT React.
// Both axios interceptors and any manual code can call start/stop.
// LoadingContext subscribes to it and renders UI. Avoids circular imports.

let activeCount = 0;
const listeners = new Set();

const notify = () => {
    const snapshot = {
        active: activeCount,
        isLoading: activeCount > 0,
    };
    listeners.forEach((fn) => {
        try {
            fn(snapshot);
        } catch {
            // never break the app because of a loader listener
        }
    });
};

export const loadingBus = {
    start() {
        activeCount += 1;
        notify();
        return activeCount;
    },
    stop() {
        activeCount = Math.max(0, activeCount - 1);
        notify();
        return activeCount;
    },
    reset() {
        activeCount = 0;
        notify();
    },
    getSnapshot() {
        return { active: activeCount, isLoading: activeCount > 0 };
    },
    subscribe(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
    },
};

export default loadingBus;
