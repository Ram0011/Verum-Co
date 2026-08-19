const HeroProductCard = ({ image, alt, size = "medium", className = "" }) => {
    const imageSizes = {
        large: "h-72",
        medium: "h-48",
        small: "h-36",
    };
    const cardSizes = {
        large: "w-[320px]",
        medium: "w-[240px]",
        small: "w-[200px]",
    };

    return (
        <div
            className={`
                ${cardSizes[size]}
                flex items-center justify-center

                rounded-[32px]

                border border-slate-200/60

                bg-white/80

                p-6

                backdrop-blur-xl

                shadow-xl

                transition-all
                duration-500
                ease-out

                hover:-translate-y-2
                hover:shadow-2xl
                hover:scale-[1.02]

                ${className}
            `}
        >
            <img
                src={image}
                alt={alt}
                className={`${imageSizes[size]} ${cardSizes[size]} w-auto object-contain`}
            />
        </div>
    );
};

export default HeroProductCard;
