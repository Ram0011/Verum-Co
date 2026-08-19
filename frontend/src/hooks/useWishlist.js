import { useCallback, useEffect, useState } from "react";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} from "@/api/wishlist.api";

const useWishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(false);

    const refetchWishlist = useCallback(async () => {
        try {
            const data = await getWishlist();
            setWishlist(data);
            return data;
        } catch (error) {
            console.error(error);
            setWishlist(null);
            return null;
        }
    }, []);

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));

        if (auth?.token) {
            refetchWishlist();
        }
    }, [refetchWishlist]);

    const isInWishlist = async (productId) => {
        try {
            const data = wishlist || (await getWishlist());

            return data?.products?.some(
                (product) => product._id.toString() === productId.toString(),
            );
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const toggleWishlist = async (productId) => {
        try {
            setLoading(true);

            const isAlreadyIn = await isInWishlist(productId);

            if (isAlreadyIn) {
                await removeFromWishlist(productId);
            } else {
                await addToWishlist(productId);
            }

            await refetchWishlist();

            return !isAlreadyIn;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        wishlist,
        loading,
        isInWishlist,
        toggleWishlist,
        refetchWishlist,
    };
};

export default useWishlist;