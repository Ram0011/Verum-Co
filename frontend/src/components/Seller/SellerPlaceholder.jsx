import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Sparkles, Clock, BellRing } from "lucide-react";

function SellerPlaceholder(props) {
    let title = "Coming soon";
    if (props.title) {
        title = props.title;
    }

    let desc = "We're crafting something great for this section.";
    if (props.desc) {
        desc = props.desc;
    }

    let backTo = "/seller";
    if (props.backTo) {
        backTo = props.backTo;
    }

    let backLabel = "Back to dashboard";
    if (props.backLabel) {
        backLabel = props.backLabel;
    }

    let ctaTo = "/seller/products";
    if (props.ctaTo) {
        ctaTo = props.ctaTo;
    }

    let ctaLabel = "Manage products";
    if (props.ctaLabel) {
        ctaLabel = props.ctaLabel;
    }

    const boxes = [
        { icon: Sparkles, label: "Designed with care" },
        { icon: BellRing, label: "You'll be notified" },
        { icon: ArrowUpRight, label: "Built for scale" },
    ];

    return (
        <div className="relative overflow-hidden rounded-[28px] border border-[#e7e0d3] bg-white px-6 py-12 text-center shadow-[0_2px_20px_-10px_rgba(20,23,31,0.2)] sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#C9A15A]/12 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#14171F]/[0.06] blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.5]"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(201,161,90,0.22) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        maskImage:
                            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
                    }}
                />
            </div>

            <div className="relative mx-auto flex w-fit items-center gap-2 rounded-full border border-[#C9A15A]/30 bg-[#C9A15A]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a6a2a]">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A15A] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C9A15A]" />
                </span>
                In the works
            </div>

            <span className="relative mx-auto mt-6 grid h-20 w-20 place-items-center rounded-[26px] bg-gradient-to-br from-[#14171F] to-[#3a3f4d] text-[#E3C37C] shadow-[0_20px_44px_-16px_rgba(20,23,31,0.55)]">
                <Clock size={30} />
            </span>

            <h2 className="relative mt-6 font-serif text-[26px] font-semibold text-[#14171F] sm:text-[32px]">
                {title} — <span className="italic text-[#C9A15A]">almost ready.</span>
            </h2>
            <p className="relative mx-auto mt-2 max-w-md text-[13.5px] leading-6 text-[#6B6456]">
                {desc}
            </p>

            <div className="relative mx-auto mt-6 grid max-w-lg grid-cols-1 gap-2.5 text-left sm:grid-cols-3">
                {boxes.map(function (f) {
                    const BoxIcon = f.icon;
                    return (
                        <div
                            key={f.label}
                            className="flex items-center gap-2 rounded-2xl border border-[#ece5d6] bg-[#fbf9f4] px-3.5 py-3 text-[12.5px] font-semibold text-[#3a3f4d]"
                        >
                            <BoxIcon size={15} className="shrink-0 text-[#C9A15A]" />
                            {f.label}
                        </div>
                    );
                })}
            </div>

            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                    to={backTo}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[#14171F]/20 px-5 text-[13px] font-bold text-[#14171F] transition-all hover:-translate-y-0.5 hover:bg-[#14171F] hover:text-white"
                >
                    <ArrowLeft size={15} />
                    {backLabel}
                </Link>
                <Link
                    to={ctaTo}
                    className="verum-btn-shine relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-[#C9A15A] px-5 text-[13px] font-bold text-[#14171F] transition-all hover:-translate-y-0.5 hover:bg-[#E3C37C] hover:shadow-lg"
                >
                    {ctaLabel}
                    <ArrowUpRight size={15} />
                </Link>
            </div>
        </div>
    );
}

export default SellerPlaceholder;
