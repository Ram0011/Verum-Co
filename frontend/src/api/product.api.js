import api from "./api";

// ===============================
// CUSTOMER / PUBLIC PRODUCTS
// ===============================

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

// ===============================
// SELLER PRODUCTS
// ===============================

export const getSellerProducts = async () => {
    const response = await api.get("/seller/products");

    return response.data;
};

export const getSellerProductById = async (id) => {
    const response = await api.get(`/seller/products/${id}`);

    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post("/seller/products", productData);

    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.patch(`/seller/products/${id}`, productData);

    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/seller/products/${id}`);

    return response.data;
};
