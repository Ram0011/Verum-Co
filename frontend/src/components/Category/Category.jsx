import CategoryCard from "./CategoryCard";
import { categories } from "./category.data";

const Category = () => {
    return (
        <section className="bg-[#f7f3ec] py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Heading */}
                <div className="mb-14">
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                        <span className="h-px w-10 bg-[#c99a3d]" />
                        Explore
                    </div>

                    <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <h2 className="max-w-xl font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#11151f] sm:text-5xl">
                            Shop by
                            <span className="italic text-[#c99a3d]">
                                {" "}
                                category.
                            </span>
                        </h2>

                        <p className="max-w-md text-sm leading-6 text-[#6f6b63] sm:text-base">
                            Discover products across our carefully curated
                            collections, selected for quality, style and
                            everyday living.
                        </p>
                    </div>
                </div>

                {/* Categories */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            title={category.title}
                            icon={category.icon}
                            productCount={category.productCount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
