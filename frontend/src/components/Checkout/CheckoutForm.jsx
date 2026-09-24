import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin } from "lucide-react";
import { ButtonLoader } from "@/components/loading";

const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),

    address: z.string().min(5, "Please enter your address"),

    city: z.string().min(2, "City is required"),

    postalCode: z.string().min(4, "Enter a valid postal code"),

    country: z.string().min(2, "Country is required"),
});

const CheckoutForm = ({ onSubmit, loading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(checkoutSchema),

        defaultValues: {
            fullName: "",
            address: "",
            city: "",
            postalCode: "",
            country: "India",
        },
    });

    const inputClass =
        "h-12 w-full border border-[#d4ccbf] bg-[#f7f3ec] px-4 text-sm text-[#11151f] outline-none transition placeholder:text-[#aaa197] focus:border-[#c99a3d] focus:ring-1 focus:ring-[#c99a3d]";

    const labelClass =
        "text-xs font-semibold uppercase tracking-[0.12em] text-[#45413b]";

    const errorClass = "mt-2 text-xs text-[#a64b43]";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-[#d8d0c4] bg-[#eee8de] p-6 sm:p-8 lg:p-10"
        >
            {/* Header */}
            <div className="flex items-start gap-4 border-b border-[#d4ccbf] pb-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#cfc6b8] bg-[#f7f3ec]">
                    <MapPin className="h-5 w-5 text-[#c99a3d]" />
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c99a3d]">
                        Step 01
                    </p>

                    <h2 className="mt-2 font-serif text-2xl font-semibold text-[#11151f]">
                        Delivery details
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#6f6b63]">
                        Where should we send your order?
                    </p>
                </div>
            </div>

            <div className="mt-8 space-y-6">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className={labelClass}>
                        Full Name
                    </label>

                    <input
                        id="fullName"
                        placeholder="Enter your full name"
                        {...register("fullName")}
                        className={`mt-2 ${inputClass}`}
                    />

                    {errors.fullName && (
                        <p className={errorClass}>{errors.fullName.message}</p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className={labelClass}>
                        Address
                    </label>

                    <textarea
                        id="address"
                        placeholder="House number, street, area..."
                        {...register("address")}
                        className="mt-2 min-h-32 w-full resize-none border border-[#d4ccbf] bg-[#f7f3ec] px-4 py-3 text-sm text-[#11151f] outline-none transition placeholder:text-[#aaa197] focus:border-[#c99a3d] focus:ring-1 focus:ring-[#c99a3d]"
                    />

                    {errors.address && (
                        <p className={errorClass}>{errors.address.message}</p>
                    )}
                </div>

                {/* City + Postal */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="city" className={labelClass}>
                            City
                        </label>

                        <input
                            id="city"
                            placeholder="Enter city"
                            {...register("city")}
                            className={`mt-2 ${inputClass}`}
                        />

                        {errors.city && (
                            <p className={errorClass}>{errors.city.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="postalCode" className={labelClass}>
                            Postal Code
                        </label>

                        <input
                            id="postalCode"
                            placeholder="Enter postal code"
                            {...register("postalCode")}
                            className={`mt-2 ${inputClass}`}
                        />

                        {errors.postalCode && (
                            <p className={errorClass}>
                                {errors.postalCode.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="country" className={labelClass}>
                        Country
                    </label>

                    <input
                        id="country"
                        {...register("country")}
                        className={`mt-2 ${inputClass}`}
                    />

                    {errors.country && (
                        <p className={errorClass}>{errors.country.message}</p>
                    )}
                </div>

                {/* Submit */}
                <div className="border-t border-[#d4ccbf] pt-7">
                    <button
                        type="submit"
                        disabled={loading}
                        className="group flex h-13 w-full items-center justify-center gap-3 bg-[#11151f] text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#c99a3d] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <ButtonLoader label="Placing Order..." />
                        ) : (
                            <>
                                Place Order
                                <span className="text-[#c99a3d] transition-colors group-hover:text-white">
                                    →
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CheckoutForm;
