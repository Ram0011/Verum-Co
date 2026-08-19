import { useEffect, useState } from "react";
import { getMyOrders } from "@/api/order.api";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getMyOrders();
            setOrders(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        refetchOrders: fetchOrders,
    };
};

export default useOrders;
