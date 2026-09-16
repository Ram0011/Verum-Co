const HeroProductCard = ({ image, alt, size = "medium", className = "" }) => {
    const imageSizes = {
        large: "h-44 sm:h-56 lg:h-72",
        medium: "h-32 sm:h-40 lg:h-48",
        small: "h-28 sm:h-32 lg:h-36",
    };
    const cardSizes = {
        large: "w-[200px] sm:w-[260px] lg:w-[320px]",
        medium: "w-[170px] sm:w-[200px] lg:w-[240px]",
        small: "w-[150px] sm:w-[170px] lg:w-[200px]",
    };

    return (
        <div
            className={`
                verum-hero-card
                ${cardSizes[size]}
                group/card
                relative
                flex items-center justify-center
                overflow-hidden
                rounded-[24px] sm:rounded-[32px]
                border border-white/60
                bg-white/80
                p-4 sm:p-6
                backdrop-blur-xl
                shadow-[0_24px_60px_-20px_rgba(17,21,31,0.28)]
                transition-shadow
                duration-500
                hover:shadow-[0_32px_80px_-20px_rgba(201,154,61,0.45)]
                ${className}
            `}
        >
            <img
                src={image}
                alt={alt}
                loading="eager"
                decoding="async"
                className={`${imageSizes[size]} ${cardSizes[size]} w-auto object-contain drop-shadow-[0_18px_24px_rgba(17,21,31,0.18)]`}
            />

            {/* glass shine sweep on hover */}
            <span
                aria-hidden="true"
                className="verum-card-shine pointer-events-none absolute inset-0"
            />
        </div>
    );
};

export default HeroProductCard;
