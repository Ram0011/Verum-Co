import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const EmptyWishlist = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
                <Heart className="h-10 w-10 text-indigo-500" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
                Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-slate-500">
                Save products you love and come back to them whenever you're
                ready.
            </p>

            <Button
                className="mt-8 rounded-xl px-6"
                onClick={() => navigate("/products")}
            >
                Explore Products
            </Button>
        </div>
    );
};

export default EmptyWishlist;
