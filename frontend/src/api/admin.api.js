import api from "./api";

export const getSellers = async (search = "") => {
    const response = await api.get("/admin/sellers", {
        params: search ? { search } : {},
    });
    return response.data;
};

export const createSeller = async (data) => {
    const response = await api.post("/admin/sellers", data);
    return response.data;
};

export const deleteSeller = async (id) => {
    const response = await api.delete(`/admin/sellers/${id}`);
    return response.data;
};

export const getAdminStats = async () => {
    const response = await api.get("/admin/stats");
    return response.data;
};
