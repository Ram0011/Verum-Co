import api from "./api";

export const addToCart = async (productId, quantity) => {
    const response = await api.post("/cart", {
        productId,
        quantity,
    });

    return response.data;
};

export const getCart = async () => {
    const response = await api.get("/cart");

    return response.data;
};

export const updateCartQuantity = async (productId, quantity) => {
    const response = await api.patch(`/cart/${productId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
};
