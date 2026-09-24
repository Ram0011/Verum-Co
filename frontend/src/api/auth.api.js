import api from "./api";

export const loginUser = async (data, endpoint = "/auth/login") => {
    // const response = await api.post("/auth/login", data);
    const response = await api.post(endpoint, data);
    return response.data;
};

export const loginAdmin = async (data) => {
    const response = await api.post("/auth/admin/login", data);
    return response.data;
};

export const logoutUser = async (data) => {
    const response = await api.post("/auth/logout", data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};
