import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Plus,
    Search,
    Store,
    Trash2,
    RotateCcw,
    AlertTriangle,
    Mail,
    CalendarDays,
    X,
    UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { createSeller, deleteSeller, getSellers } from "@/api/admin.api";

function initials(name) {
    if (!name) return "S";
    const parts = name.trim().split(/\s+/);
    let out = "";
    for (let i = 0; i < parts.length && out.length < 2; i++) {
        if (parts[i][0]) out += parts[i][0];
    }
    return out.toUpperCase() || "S";
}

function formatDate(value) {
    if (!value) return "—";
    try {
        return new Date(value).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "—";
    }
}

function AdminSellers() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [deletingId, setDeletingId] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [creating, setCreating] = useState(false);

    async function fetchSellers(search = "") {
        setLoading(true);
        setError("");
        try {
            const res = await getSellers(search);
            setSellers(res.sellers || []);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Failed to load sellers. Please try again.",
            );
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSellers();
    }, []);

    // Debounced server search so typing filters sellers without spamming the API.
    useEffect(() => {
        const q = query.trim();
        if (q === "") return;
        const t = setTimeout(() => fetchSellers(q), 400);
        return () => clearTimeout(t);
    }, [query]);

    function handleQueryChange(e) {
        const value = e.target.value;
        setQuery(value);
        if (value.trim() === "") fetchSellers("");
    }

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return sellers;
        return sellers.filter(
            (s) =>
                (s.name || "").toLowerCase().includes(q) ||
                (s.email || "").toLowerCase().includes(q),
        );
    }, [sellers, query]);

    function updateField(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function handleCreate(e) {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.password) {
            toast.error("Name, email and password are required.");
            return;
        }
        setCreating(true);
        try {
            const res = await createSeller({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
            });
            const seller = res.seller;
            if (seller) setSellers((list) => [seller, ...list]);
            else fetchSellers(query.trim());
            toast.success(`Seller “${form.name.trim()}” created`);
            setForm({ name: "", email: "", password: "" });
            setModalOpen(false);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to create seller.",
            );
        } finally {
            setCreating(false);
        }
    }

    async function handleDelete(id, name) {
        setDeletingId(String(id));
        const previous = sellers;
        setSellers((list) => list.filter((s) => String(s._id) !== String(id)));
        try {
            await deleteSeller(id);
            toast.success(`Seller “${name || "Seller"}” deleted`);
        } catch (err) {
            setSellers(previous);
            toast.error(
                err?.response?.data?.message || "Failed to delete seller.",
            );
        } finally {
            setDeletingId("");
        }
    }

    let content;
    if (loading) {
        content = (
            <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 rounded-2xl border border-[#ece5d6] bg-white p-4"
                    >
                        <div className="verum-shimmer h-12 w-12 shrink-0 rounded-2xl" />
                        <div className="flex-1 space-y-2">
                            <div className="verum-shimmer h-3.5 w-1/3 rounded" />
                            <div className="verum-shimmer h-3 w-1/4 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    } else if (error) {
        content = (
            <div className="flex flex-col items-center rounded-3xl border border-red-200 bg-white px-6 py-12 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-3xl bg-red-50 text-red-500">
                    <AlertTriangle size={24} />
                </span>
                <h3 className="mt-4 font-serif text-[19px] font-semibold text-[#14171F]">
                    Something went wrong
                </h3>
                <p className="mt-1 max-w-sm text-[13.5px] text-[#6B6456]">
                    {error}
                </p>
                <button
                    type="button"
                    onClick={() => fetchSellers(query.trim())}
                    className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#14171F] px-5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C9A15A] hover:text-[#14171F]"
                >
                    <RotateCcw size={15} />
                    Try again
                </button>
            </div>
        );
    } else if (visible.length === 0) {
        content = (
            <div className="rounded-3xl border border-dashed border-[#d8cfc1] bg-white/70 px-6 py-12 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-[#f7f3ec] text-[#C9A15A]">
                    <Store size={24} />
                </span>
                <p className="mt-4 font-serif text-[18px] font-semibold text-[#14171F]">
                    {query ? `No sellers match “${query}”` : "No sellers yet"}
                </p>
                <p className="mt-1 text-[13px] text-[#6B6456]">
                    {query
                        ? "Try a different search."
                        : "Create the first seller account to get started."}
                </p>
                {!query && (
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#14171F] px-6 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C9A15A] hover:text-[#14171F]"
                    >
                        <Plus size={16} />
                        Create seller
                    </button>
                )}
            </div>
        );
    } else {
        content = (
            <>
                {/* Mobile cards */}
                <div className="space-y-3 md:hidden">
                    {visible.map((s) => {
                        const isDeleting = deletingId === String(s._id);
                        return (
                            <div
                                key={s._id}
                                className="rounded-3xl border border-[#e7e0d3] bg-white p-4 shadow-[0_2px_14px_-8px_rgba(20,23,31,0.15)]"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#14171F] font-serif text-[15px] font-bold text-[#E3C37C]">
                                        {initials(s.name)}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[14.5px] font-bold text-[#14171F]">
                                            {s.name}
                                        </p>
                                        <p className="truncate text-[12px] text-[#969087]">
                                            {s.email}
                                        </p>
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="mt-3 w-full"
                                        >
                                            <Trash2 size={14} />
                                            Delete seller
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Delete Seller
                                            </DialogTitle>
                                            <DialogDescription>
                                                Do you want to delete{" "}
                                                <span className="font-semibold text-foreground">
                                                    {s.name}
                                                </span>{" "}
                                                ({s.email})? This also removes
                                                their products and cannot be
                                                undone.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button
                                                    variant="destructive"
                                                    disabled={isDeleting}
                                                    onClick={() =>
                                                        handleDelete(
                                                            s._id,
                                                            s.name,
                                                        )
                                                    }
                                                >
                                                    {isDeleting
                                                        ? "Deleting…"
                                                        : "Delete"}
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                {/* <button
                                    type="button"
                                    onClick={() => handleDelete(s._id, s.name)}
                                    disabled={isDeleting}
                                    className={`mt-3 flex h-10 w-full items-center justify-center gap-1.5 rounded-2xl border text-[13px] font-bold transition-colors disabled:opacity-60 ${
                                        isConfirming
                                            ? "border-red-500 bg-red-600 text-white"
                                            : "border-red-200 text-red-600 active:bg-red-50"
                                    }`}
                                >
                                    <Trash2 size={14} />
                                    {isConfirming
                                        ? "Tap again to confirm"
                                        : "Delete seller"}
                                </button> */}
                            </div>
                        );
                    })}
                </div>

                {/* Desktop table */}
                <div className="hidden overflow-hidden rounded-3xl border border-[#e7e0d3] bg-white shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)] md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-[13.5px]">
                            <thead>
                                <tr className="border-b border-[#efe9db] bg-[#fbf9f4] text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#969087]">
                                    <th className="px-6 py-4">Seller</th>
                                    <th className="px-4 py-4">Email</th>
                                    <th className="px-4 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3eee4]">
                                {visible.map((s) => {
                                    const isDeleting =
                                        deletingId === String(s._id);
                                    return (
                                        <tr
                                            key={s._id}
                                            className="transition-colors hover:bg-[#fbf8f1]"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#14171F] font-serif text-[15px] font-bold text-[#E3C37C]">
                                                        {initials(s.name)}
                                                    </span>
                                                    <span className="font-bold text-[#14171F]">
                                                        {s.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-[#6B6456]">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Mail
                                                        size={13}
                                                        className="text-[#C9A15A]"
                                                    />
                                                    {s.email}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-[#6B6456]">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <CalendarDays
                                                        size={13}
                                                        className="text-[#C9A15A]"
                                                    />
                                                    {formatDate(s.createdAt)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {/* <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            s._id,
                                                            s.name,
                                                        )
                                                    }
                                                    disabled={isDeleting}
                                                    title={
                                                        isConfirming
                                                            ? "Click again to confirm delete"
                                                            : "Delete seller"
                                                    }
                                                    className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-bold transition-all disabled:opacity-60 ${
                                                        isConfirming
                                                            ? "border-red-500 bg-red-600 text-white hover:bg-red-700"
                                                            : "border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50"
                                                    }`}
                                                >
                                                    <Trash2 size={13} />
                                                    {isConfirming
                                                        ? "Sure?"
                                                        : "Delete"}
                                                </button> */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline">
                                                            <Trash2 size={13} />
                                                            Delete seller
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Delete Seller
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Do you want to
                                                                delete{" "}
                                                                <span className="font-semibold text-foreground">
                                                                    {s.name}
                                                                </span>{" "}
                                                                ({s.email})?
                                                                This also
                                                                removes their
                                                                products and
                                                                cannot be
                                                                undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button
                                                                    variant="destructive"
                                                                    disabled={
                                                                        isDeleting
                                                                    }
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            s._id,
                                                                            s.name,
                                                                        )
                                                                    }
                                                                >
                                                                    {isDeleting
                                                                        ? "Deleting…"
                                                                        : "Delete"}
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-[#efe9db] bg-[#fbf9f4] px-6 py-3.5 text-[12.5px] text-[#6B6456]">
                        Showing{" "}
                        <strong className="text-[#14171F]">
                            {visible.length}
                        </strong>{" "}
                        of {sellers.length} sellers
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A15A]">
                        <span className="h-px w-8 bg-[#C9A15A]" />
                        Team · {sellers.length} seller
                        {sellers.length === 1 ? "" : "s"}
                    </p>
                    <h2 className="mt-2 font-serif text-[26px] font-semibold leading-tight text-[#14171F] sm:text-[32px]">
                        Sellers
                    </h2>
                    <p className="mt-1 text-[13.5px] text-[#6B6456]">
                        Create seller accounts and remove access when needed.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="verum-btn-shine inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#14171F] px-5 text-[13.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C9A15A] hover:text-[#14171F] active:translate-y-0"
                >
                    <UserPlus size={16} />
                    New Seller
                </button>
            </div>

            <div className="rounded-3xl border border-[#e7e0d3] bg-white p-3 shadow-[0_2px_16px_-8px_rgba(20,23,31,0.12)] sm:p-4">
                <div className="group relative">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#969087] transition-colors group-focus-within:text-[#C9A15A]"
                    />
                    <input
                        value={query}
                        onChange={handleQueryChange}
                        type="search"
                        placeholder="Search by name or email…"
                        className="h-11 w-full rounded-2xl border border-[#e7e0d3] bg-[#fbf9f4] pl-11 pr-4 text-[13.5px] outline-none transition-all placeholder:text-[#969087] focus:border-[#C9A15A] focus:bg-white focus:ring-4 focus:ring-[#C9A15A]/15"
                    />
                </div>
            </div>

            {content}

            <p className="text-[12px] text-[#969087]">
                Deleting a seller also removes their products. Go to the{" "}
                <Link to="/admin" className="font-semibold underline">
                    dashboard
                </Link>{" "}
                for an overview.
            </p>

            {modalOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center p-4">
                    <div
                        className="absolute inset-0 bg-[#14171F]/60 backdrop-blur-sm"
                        onClick={() => !creating && setModalOpen(false)}
                    />
                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#f0ebe1] bg-[#fbf9f4] px-6 py-4">
                            <div>
                                <h3 className="font-serif text-[19px] font-semibold text-[#14171F]">
                                    New seller
                                </h3>
                                <p className="text-[12.5px] text-[#6B6456]">
                                    They can log in as a seller right away.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                disabled={creating}
                                aria-label="Close"
                                className="grid h-9 w-9 place-items-center rounded-full border border-[#e7e0d3] text-[#6B6456] transition-colors hover:bg-white disabled:opacity-50"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <form
                            onSubmit={handleCreate}
                            className="space-y-4 px-6 py-5"
                        >
                            <div>
                                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B6456]">
                                    Name
                                </label>
                                <input
                                    value={form.name}
                                    onChange={(e) =>
                                        updateField("name", e.target.value)
                                    }
                                    placeholder="Aarav Kapoor"
                                    className="h-11 w-full rounded-2xl border border-[#e7e0d3] bg-[#fbf9f4] px-4 text-[14px] outline-none placeholder:text-[#969087] focus:border-[#C9A15A] focus:bg-white focus:ring-4 focus:ring-[#C9A15A]/15"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B6456]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        updateField("email", e.target.value)
                                    }
                                    placeholder="seller@verum.co"
                                    className="h-11 w-full rounded-2xl border border-[#e7e0d3] bg-[#fbf9f4] px-4 text-[14px] outline-none placeholder:text-[#969087] focus:border-[#C9A15A] focus:bg-white focus:ring-4 focus:ring-[#C9A15A]/15"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B6456]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) =>
                                        updateField("password", e.target.value)
                                    }
                                    placeholder="Min. 6 characters"
                                    className="h-11 w-full rounded-2xl border border-[#e7e0d3] bg-[#fbf9f4] px-4 text-[14px] outline-none placeholder:text-[#969087] focus:border-[#C9A15A] focus:bg-white focus:ring-4 focus:ring-[#C9A15A]/15"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={creating}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#14171F] text-[14px] font-bold text-white transition-all hover:bg-[#C9A15A] hover:text-[#14171F] disabled:opacity-60"
                            >
                                {creating ? (
                                    "Creating…"
                                ) : (
                                    <>
                                        <Plus size={16} />
                                        Create seller
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminSellers;
