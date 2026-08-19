import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ProductGallery = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="flex h-[500px] items-center justify-center border border-[#ded8ce] bg-[#eee8de]">
                <span className="text-sm text-[#8b857c]">
                    No Image Available
                </span>
            </div>
        );
    }

    const previousImage = () => {
        setSelectedImage((current) =>
            current === 0 ? images.length - 1 : current - 1,
        );
    };

    const nextImage = () => {
        setSelectedImage((current) =>
            current === images.length - 1 ? 0 : current + 1,
        );
    };

    const currentImage = images[selectedImage];

    return (
        <div className="space-y-5">
            {/* Main Image */}
            <div className="group relative overflow-hidden border border-[#ded8ce] bg-[#eee8de]">
                <div className="flex h-[500px] items-center justify-center p-10 sm:h-[600px]">
                    <img
                        src={currentImage?.url}
                        alt={currentImage?.alt || "Product image"}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>

                {/* Navigation */}
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={previousImage}
                            aria-label="Previous image"
                            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#d4ccbf] bg-[#f7f3ec]/90 text-[#11151f] backdrop-blur transition hover:border-[#c99a3d] hover:text-[#c99a3d]"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={nextImage}
                            aria-label="Next image"
                            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#d4ccbf] bg-[#f7f3ec]/90 text-[#11151f] backdrop-blur transition hover:border-[#c99a3d] hover:text-[#c99a3d]"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </>
                )}

                {/* Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-[#11151f] px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-[#f7f3ec]">
                        {String(selectedImage + 1).padStart(2, "0")} /{" "}
                        {String(images.length).padStart(2, "0")}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {images.map((image, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`shrink-0 overflow-hidden border bg-[#eee8de] transition ${
                                selectedImage === index
                                    ? "border-[#c99a3d]"
                                    : "border-[#ded8ce] hover:border-[#aaa197]"
                            }`}
                        >
                            <img
                                src={image.url}
                                alt={image.alt || `Product ${index + 1}`}
                                className="h-20 w-20 object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
