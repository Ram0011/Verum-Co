import { NavLink, Link } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    Boxes,
    ShoppingBag,
    Store,
    LifeBuoy,
    X,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

// simple list of links, grouped by section
const NAV_SECTIONS = [
    {
        label: "Overview",
        items: [
            {
                to: "/seller",
                end: true,
                label: "Dashboard",
                desc: "Performance at a glance",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        label: "Catalog",
        items: [
            {
                to: "/seller/products",
                label: "Products",
                desc: "Manage your listings",
                icon: Package,
            },
            {
                to: "/seller/products/create",
                label: "Add Product",
                desc: "List something new",
                icon: PlusCircle,
                badge: "Soon",
            },
            {
                to: "/seller/inventory",
                label: "Inventory",
                desc: "Stock & availability",
                icon: Boxes,
                badge: "Soon",
            },
        ],
    },
    {
        label: "Sales",
        items: [
            {
                to: "/seller/orders",
                label: "Orders",
                desc: "Fulfil & track",
                icon: ShoppingBag,
                badge: "Soon",
            },
        ],
    },
];

// one link in the sidebar
function NavItem(props) {
    const item = props.item;
    const Icon = item.icon;

    return (
        <NavLink to={item.to} end={item.end} onClick={props.onNavigate}>
            {function (obj) {
                const isActive = obj.isActive;

                let linkClass = "text-[#FAF6EF]/70 hover:bg-white/[0.06] hover:text-[#FAF6EF]";
                if (isActive === true) {
                    linkClass = "text-[#14171F]";
                }

                let pill = null;
                if (isActive === true) {
                    pill = (
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E3C37C] via-[#C9A15A] to-[#B08A45] shadow-[0_8px_24px_-8px_rgba(201,161,90,0.7)]" />
                    );
                }

                let iconBox = "bg-white/[0.07] text-[#E3C37C] group-hover:bg-white/[0.12]";
                if (isActive === true) {
                    iconBox = "bg-[#14171F]/12 text-[#14171F]";
                }

                let badge = null;
                if (item.badge) {
                    let badgeClass = "bg-[#C9A15A]/15 text-[#E3C37C] ring-1 ring-[#C9A15A]/30";
                    if (isActive === true) {
                        badgeClass = "bg-[#14171F]/15 text-[#14171F]";
                    }
                    badge = (
                        <span
                            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] ${badgeClass}`}
                        >
                            {item.badge}
                        </span>
                    );
                }

                let descClass = "text-white/40";
                if (isActive === true) {
                    descClass = "text-[#14171F]/65";
                }

                let dot = null;
                if (isActive === true) {
                    dot = <span className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-[#14171F]" />;
                }

                return (
                    <span
                        className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-3.5 py-3 transition-colors duration-200 ${linkClass}`}
                    >
                        {pill}
                        <span
                            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${iconBox}`}
                        >
                            <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
                        </span>
                        <span className="relative min-w-0 flex-1">
                            <span className="flex items-center gap-2 text-[13.5px] font-semibold leading-tight">
                                <span className="truncate">{item.label}</span>
                                {badge}
                            </span>
                            <span className={`block truncate text-[11.5px] leading-tight ${descClass}`}>
                                {item.desc}
                            </span>
                        </span>
                        {dot}
                    </span>
                );
            }}
        </NavLink>
    );
}

function SidebarContent(props) {
    function handleClick() {
        if (props.onNavigate) {
            props.onNavigate();
        }
    }

    return (
        <div className="flex h-full min-h-0 flex-col">
            {/* Brand */}
            <Link to="/" onClick={handleClick} className="group flex items-center gap-3 px-2 pb-2 pt-1">
                <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#E3C37C] to-[#A9803F] font-serif text-xl font-bold text-[#14171F] shadow-[0_10px_28px_-10px_rgba(201,161,90,0.8)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                    V<span className="verum-btn-shine absolute inset-0" />
                </span>
                <span className="min-w-0">
                    <span className="block truncate font-serif text-[17px] font-semibold leading-tight text-white">
                        Verum &amp; Co.
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A15A]">
                        <Sparkles className="h-3 w-3" />
                        Seller Studio
                    </span>
                </span>
            </Link>

            <div className="mx-2 my-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Nav */}
            <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-1 pb-4 [scrollbar-width:thin] [scrollbar-color:rgba(201,161,90,0.4)_transparent]">
                {NAV_SECTIONS.map(function (section) {
                    return (
                        <div key={section.label}>
                            <p className="mb-2 px-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                                {section.label}
                            </p>
                            <div className="space-y-1">
                                {section.items.map(function (item) {
                                    return (
                                        <NavItem
                                            key={item.to}
                                            item={item}
                                            onNavigate={props.onNavigate}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* Growth card */}
            <div className="relative mx-1 mt-2 overflow-hidden rounded-2xl border border-[#C9A15A]/25 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-4">
                <div className="verum-orb-a pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full" />
                <p className="relative text-[13px] font-semibold text-white">Grow your storefront</p>
                <p className="relative mt-1 text-[12px] leading-5 text-white/55">
                    Add products, keep stock fresh and watch orders roll in.
                </p>
                <Link
                    to="/seller/products/create"
                    onClick={handleClick}
                    className="verum-btn-shine group relative mt-3 inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-[#C9A15A] px-3.5 py-2 text-[12px] font-bold text-[#14171F] transition-all hover:bg-[#E3C37C] hover:shadow-[0_8px_24px_-8px_rgba(201,161,90,0.9)]"
                >
                    List a product
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </div>

            {/* Footer */}
            <div className="space-y-1 px-1 pb-1 pt-4">
                <Link
                    to="/"
                    onClick={handleClick}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                    <Store className="h-4 w-4 text-[#C9A15A]" />
                    Back to store
                </Link>
                <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                    <LifeBuoy className="h-4 w-4 text-[#C9A15A]" />
                    Help &amp; support
                </button>
            </div>
        </div>
    );
}

function SellerSidebar(props) {
    const mobileOpen = props.mobileOpen || false;

    function handleClose() {
        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <>
            {/* Desktop — sticky, always visible on lg+ */}
            <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col overflow-hidden bg-[#14171F] p-4 text-[#FAF6EF] lg:flex xl:w-[300px]">
                {/* ambient texture */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#C9A15A]/[0.08] blur-3xl" />
                    <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#C9A15A]/[0.06] blur-3xl" />
                    <div className="verum-grain absolute inset-0" />
                </div>
                <div className="relative flex h-full min-h-0 flex-col">
                    <SidebarContent onNavigate={undefined} />
                </div>
            </aside>

            {/* Mobile drawer - simple show / hide, no animation */}
            {mobileOpen === true && (
                <>
                    <div
                        onClick={handleClose}
                        className="fixed inset-0 z-40 bg-[#14171F]/60 backdrop-blur-sm lg:hidden"
                    />
                    <aside className="fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-[330px] flex-col overflow-hidden bg-[#14171F] p-4 text-[#FAF6EF] shadow-2xl lg:hidden">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#C9A15A]/[0.1] blur-3xl" />
                            <div className="verum-grain absolute inset-0" />
                        </div>
                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label="Close menu"
                            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                        >
                            <X className="h-4.5 w-4.5" size={18} />
                        </button>
                        <div className="relative flex h-full min-h-0 flex-col pt-8">
                            <SidebarContent onNavigate={handleClose} />
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}

export default SellerSidebar;
