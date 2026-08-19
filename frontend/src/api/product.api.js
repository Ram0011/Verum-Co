import api from "./api"; // or "../api" depending on your folder structure

export const getProducts = async (params = {}) => {
    const response = await api.get("/products", {
        params,
    });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};
