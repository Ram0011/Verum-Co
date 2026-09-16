import { ArrowLeft, PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useOrders from "@/hooks/useOrders";
import { OrderCard, EmptyOrders } from "@/components/Orders";
import { OrdersSkeleton, ContentFade } from "@/components/loading";

const Orders = () => {
    const navigate = useNavigate();

    const { orders, loading, error } = useOrders();

    if (loading) {
        return (
            <section className="min-h-screen bg-[#f7f3ec] px-6 py-16">
                <div className="mx-auto max-w-[1200px]">
                    <OrdersSkeleton />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ec] px-6">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a64b43]">
                        Something went wrong
                    </p>

                    <h1 className="mt-4 font-serif text-4xl text-[#11151f]">
                        We couldn't load your orders.
                    </h1>

                    <p className="mt-3 text-sm text-[#6f6b63]">
                        Please try again in a moment.
                    </p>
                </div>
            </section>
        );
    }

    if (!orders?.length) {
        return <EmptyOrders />;
    }

    return (
        <ContentFade id={`orders-${orders.length}`}>
        <section className="min-h-screen bg-[#f7f3ec] px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-[1200px]">
                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f6b63] transition-colors hover:text-[#c99a3d]"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Continue Shopping
                </button>

                {/* Header */}
                <div className="mb-12 mt-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c99a3d]">
                            <span className="h-px w-8 bg-[#c99a3d]" />
                            Your Account
                        </div>

                        <h1 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.025em] text-[#11151f] sm:text-5xl">
                            Your orders.
                        </h1>

                        <p className="mt-4 max-w-lg text-sm leading-7 text-[#6f6b63] sm:text-base">
                            Review your purchases and keep track of everything
                            you've ordered.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#8b857c]">
                        <PackageCheck className="h-4 w-4 text-[#c99a3d]" />
                        {orders.length}{" "}
                        {orders.length === 1 ? "order" : "orders"}
                    </div>
                </div>

                {/* Orders */}
                <div className="space-y-5">
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            </div>
        </section>
        </ContentFade>
    );
};

export default Orders;
