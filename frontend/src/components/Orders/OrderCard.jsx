import {
    CheckCircle2,
    ChevronRight,
    Clock3,
    Package,
    XCircle,
} from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

const OrderCard = ({ order }) => {
    const formattedDate = new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        },
    );

    const statusConfig = {
        pending: {
            label: "Pending",
            icon: Clock3,
            className: "border-[#d9c89e] bg-[#f5ecd5] text-[#8a6b24]",
        },

        delivered: {
            label: "Delivered",
            icon: CheckCircle2,
            className: "border-[#bfd0b8] bg-[#e7efe4] text-[#55714d]",
        },

        cancelled: {
            label: "Cancelled",
            icon: XCircle,
            className: "border-[#d9b8b4] bg-[#f3e5e3] text-[#9a4942]",
        },
    };

    const status = statusConfig[order.status] || {
        label: order.status,
        icon: Package,
        className: "border-[#d4ccbf] bg-[#eee8de] text-[#6f6b63]",
    };

    const StatusIcon = status.icon;

    return (
        <article className="border border-[#d8d0c4] bg-[#eee8de] transition-all duration-300 hover:border-[#cfc4b4]">
            {/* Header */}
            <div className="flex flex-col gap-5 border-b border-[#d4ccbf] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#cfc6b8] bg-[#f7f3ec]">
                        <Package className="h-5 w-5 text-[#c99a3d]" />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b857c]">
                            Order placed
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#11151f]">
                            {formattedDate}
                        </p>

                        <p className="mt-1 text-[10px] text-[#9b958c]">
                            #{order._id?.slice(-8).toUpperCase()}
                        </p>
                    </div>
                </div>

                {/* Status */}
                <div
                    className={`flex w-fit items-center gap-2 border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${status.className}`}
                >
                    <StatusIcon className="h-3.5 w-3.5" />

                    {status.label}
                </div>
            </div>

            {/* Products */}
            <div className="divide-y divide-[#d4ccbf] px-6 sm:px-7">
                {order.items.map((item) => (
                    <div key={item.productId} className="flex gap-4 py-5">
                        {/* Image */}
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-[#d4ccbf] bg-[#f7f3ec] p-2 sm:h-24 sm:w-24">
                            {item.thumbnail ? (
                                <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <Package className="h-6 w-6 text-[#b8b0a5]" />
                            )}
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 font-serif text-lg font-semibold leading-tight text-[#11151f]">
                                {item.name}
                            </h3>

                            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#8b857c]">
                                Quantity: {item.quantity}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold text-[#11151f] sm:text-base">
                                {formatCurrency(item.price * item.quantity)}
                            </p>

                            <p className="mt-1 text-[10px] text-[#9b958c]">
                                {formatCurrency(item.price)} each
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-5 border-t border-[#d4ccbf] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b857c]">
                        Order Total
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-[#11151f]">
                        {formatCurrency(order.totalAmount)}
                    </p>
                </div>

                <button
                    type="button"
                    className="group flex w-full items-center justify-center gap-2 border border-[#11151f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#11151f] transition-all hover:border-[#c99a3d] hover:text-[#c99a3d] sm:w-auto"
                >
                    View Details
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </article>
    );
};

export default OrderCard;
