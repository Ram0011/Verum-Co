const HeroBackground = () => {
    return (
        <>
            {/* Indigo Glow */}
            <div
                className="
                    absolute
                    top-20
                    left-1/2
                    h-[420px]
                    w-[420px]
                    -translate-x-1/2
                    rounded-full
                    bg-indigo-500/15
                    blur-3xl
                "
            />

            {/* Floating Platform */}
            <div
                className="
                    absolute
                    bottom-16
                    left-1/2
                    h-[320px]
                    w-[620px]
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r
                    from-indigo-100
                    via-white
                    to-purple-100
                    opacity-70
                    blur-xl
                "
            />

            {/* Accent Circle */}
            <div
                className="
                    absolute
                    top-12
                    right-20
                    h-6
                    w-6
                    rounded-full
                    bg-indigo-300
                    blur-sm
                "
            />

            {/* Accent Circle */}
            <div
                className="
                    absolute
                    bottom-12
                    left-16
                    h-4
                    w-4
                    rounded-full
                    bg-purple-300
                    blur-sm
                "
            />
        </>
    );
};

export default HeroBackground;
