import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, PencilLine, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteProduct, getProductById, getSellerProductById, updateProduct } from "@/api/product.api";
import ProductForm, { formFromProduct } from "@/components/Seller/ProductForm";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initial, setInitial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setLoadError("");
            try {
                // Prefer the ownership-checked seller endpoint; fall back to public for admins.
                let product = null;
                try {
                    const res = await getSellerProductById(id);
                    product = res?.product || res;
                } catch (sellerErr) {
                    if (sellerErr?.response?.status === 404 || sellerErr?.response?.status === 403) throw sellerErr;
                    const res = await getProductById(id);
                    product = res?.product || res;
                }
                if (!product || (!product._id && !product.id)) throw new Error("Product not found");
                if (mounted) setInitial(formFromProduct(product));
            } catch (err) {
                const msg = err?.response?.data?.message || "Could not load this product.";
                if (mounted) setLoadError(msg);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, [id]);

    const handleSubmit = async (payload) => {
        setSubmitting(true);
        setServerError("");
        try {
            const res = await updateProduct(id, payload);
            const updated = res?.product || res;
            toast.success(`“${updated?.name || "Product"}” updated — dashboard refreshed`);
            navigate("/seller/products", { replace: true, state: { refresh: true, updated: id } });
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to update product. Please try again.";
            setServerError(msg);
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirming) {
            setConfirming(true);
            return;
        }
        setDeleting(true);
        try {
            await deleteProduct(id);
            toast.success("Product deleted — dashboard updated");
            navigate("/seller/products", { replace: true, state: { refresh: true, deleted: id } });
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to delete product.");
            setDeleting(false);
            setConfirming(false);
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
                        Catalog · Edit listing
                    </p>
                    <h2 className="mt-1 flex items-center gap-2 font-serif text-[26px] font-semibold leading-tight text-[#14171F] sm:text-[32px]">
                        <PencilLine size={24} className="text-[#C9A15A]" />
                        Edit product
                    </h2>
                    <p className="text-[13.5px] text-[#6B6456]">Changes reflect on your dashboard as soon as you save.</p>
                </div>
            </div>

            <div className="rounded-[28px] border border-[#e7e0d3] bg-white p-5 shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)] sm:p-7">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-14 text-[13.5px] text-[#6B6456]">
                        <Loader2 size={18} className="animate-spin text-[#C9A15A]" />
                        Loading product…
                    </div>
                ) : loadError ? (
                    <div className="py-10 text-center">
                        <p className="font-serif text-[18px] font-semibold text-[#14171F]">Couldn&apos;t open this product</p>
                        <p className="mx-auto mt-1 max-w-sm text-[13px] text-[#6B6456]">{loadError}</p>
                        <Link
                            to="/seller/products"
                            className="mt-5 inline-flex h-11 items-center rounded-full bg-[#14171F] px-6 text-[13px] font-bold text-white"
                        >
                            Back to products
                        </Link>
                    </div>
                ) : (
                    <>
                        <ProductForm
                            key={id}
                            initial={initial}
                            submitLabel={submitting ? "Saving…" : "Save changes"}
                            submitting={submitting}
                            serverError={serverError}
                            onSubmit={handleSubmit}
                            onDelete={handleDelete}
                            deleting={deleting}
                        />
                        {confirming && (
                            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50/60 p-4 text-[13px] sm:flex-row sm:items-center">
                                <p className="flex flex-1 items-center gap-2 font-semibold text-red-700">
                                    <Trash2 size={15} />
                                    Delete this product permanently? This also removes it from your dashboard.
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setConfirming(false)}
                                        className="h-9 rounded-full border border-[#e7e0d3] bg-white px-4 text-[12.5px] font-bold"
                                    >
                                        Keep it
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-red-600 px-4 text-[12.5px] font-bold text-white disabled:opacity-60"
                                    >
                                        {deleting && <Loader2 size={14} className="animate-spin" />}
                                        Yes, delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default EditProduct;
