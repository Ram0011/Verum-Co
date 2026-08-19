import { useEffect, useState } from "react";
import { getProductById } from "@/api/product.api";

const useProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getProductById(id);

                setProduct(data);
            } catch (error) {
                console.error("Product fetch error:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return {
        product,
        loading,
        error,
    };
};

export default useProduct;
