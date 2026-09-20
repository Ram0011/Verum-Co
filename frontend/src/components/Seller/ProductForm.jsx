/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

export const CATEGORY_OPTIONS = [
    "Electronics",
    "Fashion",
    "Home",
    "Wearables",
    "Gaming",
    "Beauty",
];

export const BADGE_OPTIONS = [
    { value: "", label: "No badge" },
    { value: "New", label: "New" },
    { value: "Best Seller", label: "Best Seller" },
    { value: "Popular", label: "Popular" },
    { value: "20% OFF", label: "20% OFF" },
];

export const EMPTY_FORM = {
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    badge: "",
    isFeatured: false,
    isActive: true,
    imageUrls: [""],
};

export function formFromProduct(p) {
    const images = Array.isArray(p?.images)
        ? p.images
              .map((img) => (typeof img === "string" ? img : img?.url || ""))
              .filter(Boolean)
        : [];
    return {
        name: p?.name || "",
        description: p?.description || "",
        price: p?.price ?? "",
        originalPrice: p?.originalPrice ?? "",
        category: typeof p?.category === "object" ? p?.category?.name || "" : p?.category || "",
        stock: p?.stock ?? "",
        badge: p?.badge || "",
        isFeatured: Boolean(p?.isFeatured),
        isActive: p?.isActive !== false,
        imageUrls: images.length > 0 ? images : [""],
    };
}

export function validateForm(f) {
    const errors = {};
    if (!String(f.name || "").trim()) errors.name = "Product name is required.";
    if (!String(f.description || "").trim()) errors.description = "Description is required.";
    if (f.price === "" || f.price === null || Number.isNaN(Number(f.price)) || Number(f.price) < 0)
        errors.price = "Enter a valid price (0 or more).";
    if (!String(f.category || "").trim()) errors.category = "Pick a category.";
    if (f.stock !== "" && (Number.isNaN(Number(f.stock)) || Number(f.stock) < 0))
        errors.stock = "Stock must be 0 or more.";
    if (
        f.originalPrice !== "" &&
        f.originalPrice !== null &&
        f.originalPrice !== undefined &&
        (Number.isNaN(Number(f.originalPrice)) || Number(f.originalPrice) < 0)
    )
        errors.originalPrice = "Original price must be 0 or more.";
    const urls = (f.imageUrls || []).map((u) => String(u || "").trim()).filter(Boolean);
    if (urls.length === 0) errors.imageUrls = "Add at least one image URL.";
    else if (urls.some((u) => !/^https?:\/\/.+/i.test(u))) errors.imageUrls = "Image URLs must start with http(s)://";
    return { errors, urls };
}

export function buildPayload(f, urls) {
    return {
        name: String(f.name).trim(),
        description: String(f.description).trim(),
        price: Number(f.price),
        originalPrice: f.originalPrice === "" || f.originalPrice === null ? null : Number(f.originalPrice),
        category: String(f.category).trim(),
        stock: f.stock === "" ? 0 : Number(f.stock),
        badge: f.badge || "",
        isFeatured: Boolean(f.isFeatured),
        isActive: Boolean(f.isActive),
        images: urls,
    };
}

function Field({ label, error, children, hint }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-bold text-[#14171F]">{label}</span>
            {children}
            {hint && !error && <span className="mt-1 block text-[12px] text-[#969087]">{hint}</span>}
            {error && <span className="mt-1 block text-[12px] font-semibold text-red-600">{error}</span>}
        </label>
    );
}

const inputClass = (bad) =>
    `h-11 w-full rounded-2xl border bg-[#fbf9f4] px-4 text-[13.5px] outline-none transition-all placeholder:text-[#969087] focus:bg-white focus:ring-4 ${
        bad
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-[#e7e0d3] focus:border-[#C9A15A] focus:ring-[#C9A15A]/15"
    }`;

export default function ProductForm({ initial, submitLabel, submitting, serverError, onSubmit, onDelete, deleting }) {
    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState({});

    const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const setUrl = (i, value) =>
        setForm((f) => {
            const next = [...(f.imageUrls || [""])];
            next[i] = value;
            return { ...f, imageUrls: next };
        });

    const addUrl = () => setForm((f) => ({ ...f, imageUrls: [...(f.imageUrls || []), ""] }));
    const removeUrl = (i) =>
        setForm((f) => ({
            ...f,
            imageUrls: (f.imageUrls || []).filter((_, idx) => idx !== i).length
                ? (f.imageUrls || []).filter((_, idx) => idx !== i)
                : [""],
        }));

    const previews = (form.imageUrls || []).map((u) => String(u || "").trim()).filter(Boolean);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { errors: errs, urls } = validateForm(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        onSubmit(buildPayload(form, urls));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {serverError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">
                    {serverError}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Field label="Product name *" error={errors.name}>
                    <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="e.g. Handcrafted Brass Lamp"
                        className={inputClass(errors.name)}
                        maxLength={120}
                    />
                </Field>
                <Field label="Category *" error={errors.category}>
                    <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass(errors.category)}>
                        <option value="">Select a category…</option>
                        {CATEGORY_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field label="Description *" error={errors.description} hint={`${String(form.description || "").length}/2000 characters`}>
                <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Materials, size, care instructions, what makes it special…"
                    rows={5}
                    maxLength={2000}
                    className={`w-full rounded-2xl border bg-[#fbf9f4] px-4 py-3 text-[13.5px] outline-none transition-all placeholder:text-[#969087] focus:bg-white focus:ring-4 ${
                        errors.description
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-[#e7e0d3] focus:border-[#C9A15A] focus:ring-[#C9A15A]/15"
                    }`}
                />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Price (₹) *" error={errors.price}>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={(e) => set("price", e.target.value)}
                        placeholder="999"
                        className={inputClass(errors.price)}
                    />
                </Field>
                <Field label="Original price (₹)" error={errors.originalPrice} hint="For showing a discount">
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.originalPrice}
                        onChange={(e) => set("originalPrice", e.target.value)}
                        placeholder="1299"
                        className={inputClass(errors.originalPrice)}
                    />
                </Field>
                <Field label="Stock" error={errors.stock}>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.stock}
                        onChange={(e) => set("stock", e.target.value)}
                        placeholder="25"
                        className={inputClass(errors.stock)}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Badge">
                    <select value={form.badge} onChange={(e) => set("badge", e.target.value)} className={inputClass(false)}>
                        {BADGE_OPTIONS.map((b) => (
                            <option key={b.value} value={b.value}>
                                {b.label}
                            </option>
                        ))}
                    </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[#e7e0d3] bg-[#fbf9f4] p-3">
                        <p className="text-[12.5px] font-bold text-[#14171F]">Visible to buyers</p>
                        <p className="text-[12px] text-[#969087]">Hidden items stay in drafts.</p>
                        <button
                            type="button"
                            onClick={() => set("isActive", !form.isActive)}
                            className={`mt-2 inline-flex h-8 items-center rounded-full px-4 text-[12.5px] font-bold transition-all ${
                                form.isActive ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                            }`}
                        >
                            {form.isActive ? "Active" : "Hidden"}
                        </button>
                    </div>
                    <div className="rounded-2xl border border-[#e7e0d3] bg-[#fbf9f4] p-3">
                        <p className="text-[12.5px] font-bold text-[#14171F]">Featured</p>
                        <p className="text-[12px] text-[#969087]">Pin to top spots.</p>
                        <button
                            type="button"
                            onClick={() => set("isFeatured", !form.isFeatured)}
                            className={`mt-2 inline-flex h-8 items-center rounded-full px-4 text-[12.5px] font-bold transition-all ${
                                form.isFeatured ? "bg-[#14171F] text-[#E3C37C]" : "bg-slate-200 text-slate-700"
                            }`}
                        >
                            {form.isFeatured ? "Yes" : "No"}
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <span className="mb-1.5 block text-[12.5px] font-bold text-[#14171F]">Product images *</span>
                <div className="space-y-2.5">
                    {(form.imageUrls || []).map((url, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                value={url}
                                onChange={(e) => setUrl(i, e.target.value)}
                                placeholder={`https://…/image-${i + 1}.jpg`}
                                className={`${inputClass(errors.imageUrls)} flex-1`}
                            />
                            {(form.imageUrls || []).length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeUrl(i)}
                                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#e7e0d3] text-slate-500 transition-colors hover:border-red-300 hover:text-red-600"
                                    aria-label="Remove image"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {errors.imageUrls && <p className="mt-1 text-[12px] font-semibold text-red-600">{errors.imageUrls}</p>}
                <button
                    type="button"
                    onClick={addUrl}
                    className="mt-2 inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-[#C9A15A]/60 px-4 text-[12.5px] font-bold text-[#8a6a2a] transition-all hover:bg-[#C9A15A]/10"
                >
                    <ImagePlus size={15} />
                    Add another image
                </button>
                {previews.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                        {previews.slice(0, 6).map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`Preview ${i + 1}`}
                                className="h-16 w-16 shrink-0 rounded-2xl border border-[#e7e0d3] object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col-reverse gap-2.5 pt-1 sm:flex-row sm:items-center">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#14171F] px-6 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C9A15A] hover:text-[#14171F] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                    {submitting && <Loader2 size={16} className="animate-spin" />}
                    {submitLabel}
                </button>
                {onDelete && (
                    <button
                        type="button"
                        onClick={onDelete}
                        disabled={deleting}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-red-200 px-6 text-[14px] font-bold text-red-600 transition-all hover:bg-red-50 disabled:opacity-60"
                    >
                        {deleting && <Loader2 size={16} className="animate-spin" />}
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
}
