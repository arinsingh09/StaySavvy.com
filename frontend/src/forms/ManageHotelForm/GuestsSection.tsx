import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                        Adults
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        type="number" min={1}
                        {...register("adultCount", { required: "This field is required" })}
                    />
                    {errors.adultCount && (
                        <span className="text-red-500 text-sm font-bold">
                            {errors.adultCount.message}
                        </span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                        Children
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        type="number" min={0}
                        {...register("childCount", { required: "This field is required" })}
                    />
                    {errors.childCount && (
                        <span className="text-red-500 text-sm font-bold">
                            {errors.childCount.message}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuestsSection;
