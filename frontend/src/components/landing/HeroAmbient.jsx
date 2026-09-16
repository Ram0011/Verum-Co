import { useMemo } from "react";

// Ambient hero atmosphere: drifting orbs, slow rotating ring, rising dust.
// All CSS keyframes (transform/opacity only). Memoized particles = zero re-renders.
const HeroAmbient = () => {
    const particles = useMemo(
        () =>
            Array.from({ length: 14 }).map((_, i) => ({
                id: i,
                left: `${(i * 67 + 13) % 100}%`,
                size: 3 + ((i * 7) % 4),
                duration: `${7 + ((i * 13) % 8)}s`,
                delay: `${-((i * 17) % 90) / 10}s`,
                opacity: 0.25 + ((i * 11) % 40) / 100,
            })),
        [],
    );

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            {/* warm gold orb */}
            <div className="verum-orb-a absolute -top-24 right-[8%] h-[380px] w-[380px] rounded-full" />

            {/* soft cream orb */}
            <div className="verum-orb-b absolute bottom-[-140px] left-[-100px] h-[420px] w-[420px] rounded-full" />

            {/* slow rotating dashed ring */}
            <div className="verum-ring-spin absolute left-1/2 top-1/2 hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#c99a3d]/25" />
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#c99a3d]" />
            </div>

            {/* rising gold dust */}
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="verum-dust absolute bottom-0 rounded-full bg-[#c99a3d]"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                    }}
                />
            ))}

            {/* film grain */}
            <div className="verum-grain absolute inset-0" />
        </div>
    );
};

export default HeroAmbient;
