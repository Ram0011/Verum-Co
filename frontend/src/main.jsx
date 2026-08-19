import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
            <Toaster richColors position="top-center" />
        </AuthProvider>
    </BrowserRouter>,
);
