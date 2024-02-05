import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId: string,
    pricePerNight: number,
}

type GuestInfoFormData = {
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        }
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate("/signin", { state: { from: location } });
    }

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    }

    return (
        <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
            <div className="flex justify-between mb-4">
                <h4 className="text-lg font-semibold">Price per Night: ₹{pricePerNight}</h4>
            </div>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block font-semibold">
                            Check-in Date &nbsp; &nbsp;
                            <DatePicker
                                required
                                selected={checkIn}
                                onChange={(date) => setValue("checkIn", date as Date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Select check-in date"
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block font-semibold">
                            Check-out Date &nbsp; 
                            <DatePicker
                                required
                                selected={checkOut}
                                onChange={(date) => setValue("checkOut", date as Date)}
                                selectsEnd
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={checkIn || minDate}
                                maxDate={maxDate}
                                placeholderText="Select check-out date"
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block font-semibold">
                            Adults
                            <input
                                type="number"
                                min={1}
                                max={20}
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                                {...register("adultCount", { required: true, min: 1 })}
                            />
                        </label>
                        <label className="block font-semibold">
                            Children
                            <input
                                type="number"
                                min={0}
                                max={20}
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                                {...register("childCount")}
                            />
                        </label>
                    </div>
                    {errors.adultCount && (
                        <span className="text-red-500 font-semibold">{errors.adultCount.type === "required" ? "Adult count is required" : "Minimum 1 adult is required"}</span>
                    )}
                    {isLoggedIn ? (
                        <button className="bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700">
                            Book Now
                        </button>
                    ) : (
                        <button className="bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700">
                            Sign in to Book
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default GuestInfoForm;