import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PackagePlus } from "lucide-react";
import { toast } from "sonner";

import { createProduct } from "@/api/product.api";
import ProductForm, { EMPTY_FORM } from "@/components/Seller/ProductForm";

function CreateProduct() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleSubmit = async (payload) => {
        setSubmitting(true);
        setServerError("");
        try {
            const res = await createProduct(payload);
            const created = res?.product || res;
            toast.success(`“${created?.name || "Product"}” is live on your dashboard`);
            // state flag tells dashboard/list to refresh immediately
            navigate("/seller/products", { replace: true, state: { refresh: true, created: created?._id } });
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to create product. Please try again.";
            setServerError(msg);
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl space-y-5">
            <div className="flex items-center gap-3">
                <Link
                    to="/seller/products"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e7e0d3] bg-white text-[#14171F] transition-all hover:border-[#14171F] hover:bg-[#14171F] hover:text-white"
                    aria-label="Back to products"
                >
                    <ArrowLeft size={17} />
                </Link>
                <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A15A]">
                        <span className="h-px w-8 bg-[#C9A15A]" />
                        Catalog · New listing
                    </p>
                    <h2 className="mt-1 flex items-center gap-2 font-serif text-[26px] font-semibold leading-tight text-[#14171F] sm:text-[32px]">
                        <PackagePlus size={26} className="text-[#C9A15A]" />
                        Create product
                    </h2>
                    <p className="text-[13.5px] text-[#6B6456]">
                        Fill the details — it goes live on your dashboard instantly.
                    </p>
                </div>
            </div>

            <div className="rounded-[28px] border border-[#e7e0d3] bg-white p-5 shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)] sm:p-7">
                <ProductForm
                    initial={EMPTY_FORM}
                    submitLabel={submitting ? "Publishing…" : "Publish product"}
                    submitting={submitting}
                    serverError={serverError}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default CreateProduct;
