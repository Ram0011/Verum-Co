const ProductDescription = ({ description }) => {
    return (
        <section className="mt-20 border-t border-[#ded8ce] pt-10">
            <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                <div>
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a3d]">
                        <span className="h-px w-6 bg-[#c99a3d]" />
                        Details
                    </div>

                    <h2 className="mt-4 font-serif text-2xl font-semibold text-[#11151f]">
                        About this product
                    </h2>
                </div>

                <p className="max-w-3xl text-sm leading-8 text-[#6f6b63] sm:text-base">
                    {description || "No description available."}
                </p>
            </div>
        </section>
    );
};

export default ProductDescription;
