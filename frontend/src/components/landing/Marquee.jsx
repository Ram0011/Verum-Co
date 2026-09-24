const ITEMS = [
    "Complimentary shipping over ₹999",
    "100% Authentic",
    "Secure checkout",
    "Easy 7-day returns",
    "Curated for everyday living",
];

// Infinite brand marquee — pure CSS, GPU-only, pauses on hover.
const Marquee = () => {
    const row = [...ITEMS, ...ITEMS];

    return (
        <div className="verum-marquee overflow-hidden border-y border-[#0e1119] bg-[#11151f] py-3.5">
            <div className="verum-marquee-track flex w-max items-center">
                {[0, 1].map((half) => (
                    <div
                        key={half}
                        aria-hidden={half === 1}
                        className="flex shrink-0 items-center"
                    >
                        {row.map((item, i) => (
                            <span
                                key={`${half}-${i}`}
                                className="flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f7f3ec]"
                            >
                                <span className="px-6">{item}</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-[#c99a3d]" />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
