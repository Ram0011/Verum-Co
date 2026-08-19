import api from "./api";

export const getWishlist = async () => {
    const response = await api.get("/wishlist");

    return response.data;
};

export const addToWishlist = async (productId) => {
    const response = await api.post(`/wishlist/${productId}`);

    return response.data;
};

export const removeFromWishlist = async (productId) => {
    try {
        const response = await api.delete(`/wishlist/${productId}`, {
            validateStatus: (status) => status < 500,
        });

        if (response.status === 204 || response.status === 200) {
            return { success: true };
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 204) {
            return { success: true };
        }
        throw error;
    }
};
