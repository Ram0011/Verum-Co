import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { getMe } from "../api/user.api";

const AuthContext = createContext();

const getStoredAuth = () => {
    try {
        const auth = localStorage.getItem("auth");

        return auth ? JSON.parse(auth) : null;
    } catch (error) {
        console.error("Error parsing auth data:", error);
        localStorage.removeItem("auth");
        toast.error("Unable to restore your session.");
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const auth = getStoredAuth();

    const [token, setToken] = useState(auth?.token || null);
    const [user, setUser] = useState(auth?.user || null);
    // True while we are verifying a persisted token via getMe().
    // Guards protected routes from redirecting on stale/null user.
    const [isLoading, setIsLoading] = useState(!!auth?.token);

    // Pure state update only — callers own navigation.
    // Navigating here (before setUser/setToken commit) lets
    // AdminProtectedRoute render with a stale user and bounce to "/".
    const login = (userData, tokenData) => {
        try {
            setUser(userData);
            setToken(tokenData);

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    user: userData,
                    token: tokenData,
                }),
            );

            if (userData.role === "admin") {
                toast.success("Admin Login Sucessful");
            } else if (userData.role === "seller") {
                toast.success("Seller Login Successful");
            } else {
                toast.success("Login successful!");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong while logging in.");
        }
    };

    const logout = () => {
        try {
            setUser(null);
            setToken(null);
            localStorage.removeItem("auth");

            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Something went wrong while logging out.");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const userData = await getMe();

                setUser(userData);

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        token,
                        user: userData,
                    }),
                );
            } catch (error) {
                console.error("Error fetching user:", error);

                if (error?.response?.status === 401) {
                    toast.error(
                        "Your session has expired. Please login again.",
                    );
                } else {
                    toast.error(
                        error?.response?.data?.message ||
                            "Unable to verify your session.",
                    );
                }

                logout();
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
