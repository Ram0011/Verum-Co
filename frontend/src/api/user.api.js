import api from "./api";

export const getMe = async () => {
    const response = await api.get("/user/me");
    return response.data;
};
