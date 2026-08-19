import { useEffect, useState } from "react";
import { getProducts } from "@/api/product.api";

const useProducts = (
    page = 1,
    limit = 12,
    category = "",
    search = "",
    minPrice = "",
    maxPrice = "",
    sort = "newest",
) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getProducts({
                    page,
                    limit,
                    ...(category && { category }),
                    ...(search && { search }),
                    ...(minPrice && { minPrice }),
                    ...(maxPrice && { maxPrice }),
                    ...(sort && { sort }),
                });

                if (ignore) return;

                setProducts(data.products || []);
                setTotal(data.total || 0);
                setPages(data.pages || 1);
            } catch (error) {
                if (ignore) return;

                console.error(error);
                setError(error);
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            ignore = true;
        };
    }, [page, limit, category, search, minPrice, maxPrice, sort]);

    return {
        products,
        total,
        pages,
        loading,
        error,
    };
};

export default useProducts;
