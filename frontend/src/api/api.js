import axios from "axios";
import loadingBus from "@/lib/loadingBus";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
    (config) => {
        // Skip the global bar for silent background refreshes.
        if (!config?.silent) loadingBus.start();
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));

            if (auth?.token) {
                config.headers.Authorization = `Bearer ${auth.token}`;
            }
        } catch {
            // Corrupted auth in localStorage — send the request without a token.
        }
        return config;
    },
    (error) => {
        if (!error?.config?.silent) loadingBus.stop();
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        if (!response?.config?.silent) loadingBus.stop();
        return response;
    },
    (error) => {
        if (!error?.config?.silent) loadingBus.stop();
        return Promise.reject(error);
    },
);

export default api;
