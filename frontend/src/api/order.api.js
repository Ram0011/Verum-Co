import api from "./api";

export const createOrder = async (shippingAddress) => {
    const response = await api.post("/orders", { shippingAddress });
    return response.data;
};

export const getMyOrders = async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
};
