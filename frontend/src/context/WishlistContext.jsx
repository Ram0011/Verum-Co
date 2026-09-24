import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} from "@/api/wishlist.api";

// Create the React context for wishlist state management
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    // State for storing the wishlist data (products array)
    const [wishlist, setWishlist] = useState(null);
    // Loading state - true while fetching/updating wishlist
    const [loading, setLoading] = useState(true);
    // Error state - stores any error that occurs during API calls
    const [error, setError] = useState(null);
    // Ref to access the latest wishlist state in callbacks without stale closures
    // This avoids adding 'wishlist' to useCallback dependency arrays
    const wishlistRef = useRef(null);

    // Keep the ref synchronized with the current wishlist state
    // Runs after every render where wishlist changes
    useEffect(() => {
        wishlistRef.current = wishlist;
    }, [wishlist]);

    // Memoized function to fetch wishlist from the API
    // useCallback with empty deps means this function reference never changes
    const fetchWishlist = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getWishlist();
            setWishlist(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch wishlist on component mount (when provider initializes)
    // Runs once because fetchWishlist reference is stable
    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    // Check if a product exists in the wishlist
    // Uses wishlistRef to avoid stale closure - reads latest state without re-creating callback
    const isInWishlist = useCallback(
        async (productId) => {
            try {
                // Use cached ref value, or fetch fresh from API if ref is null
                const data = wishlistRef.current || (await getWishlist());

                // Check if any product in wishlist matches the given productId
                return data?.products?.some(
                    (product) => product._id.toString() === productId.toString(),
                );
            } catch (err) {
                console.error(err);
                return false;
            }
        },
        [], // Empty deps - uses wishlistRef instead of wishlist state
    );

    // Toggle wishlist status for a product (add if not present, remove if present)
    const toggleWishlist = useCallback(
        async (productId) => {
            try {
                setLoading(true);

                // First check current wishlist status
                const isAlreadyIn = await isInWishlist(productId);

                // Call appropriate API based on current state
                if (isAlreadyIn) {
                    await removeFromWishlist(productId);
                } else {
                    await addToWishlist(productId);
                }

                // Refresh wishlist from server after mutation
                await fetchWishlist();

                // Return new state (true if added, false if removed)
                return !isAlreadyIn;
            } catch (err) {
                console.error(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [fetchWishlist, isInWishlist], // Dependencies needed for useCallback
    );

    // Provide wishlist state and methods to all child components
    return (
        <WishlistContext.Provider
            value={{
                wishlist,           // Current wishlist data (with products array)
                loading,            // Boolean - true during fetch/mutation
                error,              // Error object if any API call failed
                refetchWishlist: fetchWishlist,  // Manual refetch function
                isInWishlist,       // Function to check if product in wishlist
                toggleWishlist,     // Function to add/remove product from wishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

// Hook to access wishlist context in any component
export const useWishlistContext = () => {
    return useContext(WishlistContext);
};