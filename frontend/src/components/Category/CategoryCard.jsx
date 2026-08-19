import { ArrowUpRight } from "lucide-react";

const CategoryCard = ({ title, icon: Icon, productCount }) => {
    return (
        <div
            className="
                group
                relative
                cursor-pointer
                overflow-hidden
                border
                border-[#dcd5ca]
                bg-[#eee8de]
                p-7
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#c99a3d]
                hover:shadow-lg
            "
        >
            {/* Top */}
            <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center border border-[#cfc6b8] bg-[#f7f3ec] text-[#11151f] transition-colors duration-300 group-hover:border-[#c99a3d] group-hover:text-[#c99a3d]">
                    <Icon className="h-6 w-6" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cfc6b8] text-[#6f6b63] transition-all duration-300 group-hover:border-[#c99a3d] group-hover:bg-[#c99a3d] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
            </div>

            {/* Content */}
            <div className="mt-16">
                <h3 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#11151f]">
                    {title}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                    <span className="h-px w-6 bg-[#c99a3d]" />

                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b857c]">
                        {productCount}
                    </p>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 border-t border-[#d4ccbf] pt-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f6b63] transition-colors group-hover:text-[#c99a3d]">
                    Browse collection
                </span>
            </div>
        </div>
    );
};

export default CategoryCard;
