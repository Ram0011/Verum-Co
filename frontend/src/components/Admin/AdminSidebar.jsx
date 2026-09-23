import { NavLink, Link } from "react-router-dom";
import {
    LayoutDashboard,
    Store,
    LifeBuoy,
    X,
    ShieldCheck,
} from "lucide-react";

const NAV = [
    {
        to: "/admin",
        end: true,
        label: "Dashboard",
        desc: "Store overview",
        icon: LayoutDashboard,
    },
    {
        to: "/admin/sellers",
        label: "Sellers",
        desc: "Create & remove sellers",
        icon: Store,
    },
];

function NavItem({ item, onNavigate }) {
    const Icon = item.icon;
    return (
        <NavLink to={item.to} end={item.end} onClick={onNavigate}>
            {({ isActive }) => (
                <span
                    className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-3.5 py-3 transition-colors duration-200 ${
                        isActive
                            ? "text-[#14171F]"
                            : "text-[#FAF6EF]/70 hover:bg-white/[0.06] hover:text-[#FAF6EF]"
                    }`}
                >
                    {isActive && (
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E3C37C] via-[#C9A15A] to-[#B08A45] shadow-[0_8px_24px_-8px_rgba(201,161,90,0.7)]" />
                    )}
                    <span
                        className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
                            isActive
                                ? "bg-[#14171F]/12 text-[#14171F]"
                                : "bg-white/[0.07] text-[#E3C37C] group-hover:bg-white/[0.12]"
                        }`}
                    >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
                    </span>
                    <span className="relative min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-semibold leading-tight">
                            {item.label}
                        </span>
                        <span
                            className={`block truncate text-[11.5px] leading-tight ${
                                isActive
                                    ? "text-[#14171F]/65"
                                    : "text-white/40"
                            }`}
                        >
                            {item.desc}
                        </span>
                    </span>
                    {isActive && (
                        <span className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-[#14171F]" />
                    )}
                </span>
            )}
        </NavLink>
    );
}

function SidebarContent({ onNavigate }) {
    return (
        <div className="flex h-full min-h-0 flex-col">
            <Link
                to="/admin"
                onClick={onNavigate}
                className="group flex items-center gap-3 px-2 pb-2 pt-1"
            >
                <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#E3C37C] to-[#A9803F] font-serif text-xl font-bold text-[#14171F]">
                    V
                </span>
                <span className="min-w-0">
                    <span className="block truncate font-serif text-[17px] font-semibold leading-tight text-white">
                        Verum &amp; Co.
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A15A]">
                        <ShieldCheck className="h-3 w-3" />
                        Admin Panel
                    </span>
                </span>
            </Link>

            <div className="mx-2 my-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-1 pb-4">
                <p className="mb-2 px-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Manage
                </p>
                {NAV.map((item) => (
                    <NavItem
                        key={item.to}
                        item={item}
                        onNavigate={onNavigate}
                    />
                ))}
            </nav>

            <div className="space-y-1 px-1 pb-1 pt-4">
                <Link
                    to="/"
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                    <Store className="h-4 w-4 text-[#C9A15A]" />
                    Back to store
                </Link>
                <span className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white/60">
                    <LifeBuoy className="h-4 w-4 text-[#C9A15A]" />
                    Admin support
                </span>
            </div>
        </div>
    );
}

function AdminSidebar({ mobileOpen = false, onClose }) {
    return (
        <>
            <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col overflow-hidden bg-[#14171F] p-4 text-[#FAF6EF] lg:flex xl:w-[300px]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#C9A15A]/[0.08] blur-3xl" />
                    <div className="verum-grain absolute inset-0" />
                </div>
                <div className="relative flex h-full min-h-0 flex-col">
                    <SidebarContent onNavigate={undefined} />
                </div>
            </aside>

            {mobileOpen && (
                <>
                    <div
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-[#14171F]/60 backdrop-blur-sm lg:hidden"
                    />
                    <aside className="fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-[330px] flex-col overflow-hidden bg-[#14171F] p-4 text-[#FAF6EF] shadow-2xl lg:hidden">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close menu"
                            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                        >
                            <X size={18} />
                        </button>
                        <div className="relative flex h-full min-h-0 flex-col pt-8">
                            <SidebarContent onNavigate={onClose} />
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}

export default AdminSidebar;
