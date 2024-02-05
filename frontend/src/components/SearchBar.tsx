import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const search = useSearchContext();
    const navigate = useNavigate();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate("/search");
    };

    const handleClear = () => {
        sessionStorage.clear();
        setDestination("");
        setCheckIn(new Date());
        setCheckOut(new Date());
        setAdultCount(1);
        setChildCount(0);
        window.location.reload();
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 gap-4 p-4 lg:p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-row items-center bg-white p-2 rounded-lg">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>
            <div className="flex gap-2 bg-white p-2 rounded-lg">
                <label className="flex items-center">
                    Adults:{" "}
                    <input
                        className="w-12 p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) => setAdultCount(parseInt(event.target.value))}
                    />
                </label>
                <label className="flex items-center">
                    Children:{" "}
                    <input
                        className="w-12 p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(event) => setChildCount(parseInt(event.target.value))}
                    />
                </label>
            </div>
            <div>
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="w-full p-2 bg-white rounded-lg focus:outline-none"
                    wrapperClassName="w-full"
                />
            </div>
            <div>
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn}
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="w-full p-2 bg-white rounded-lg focus:outline-none"
                    wrapperClassName="w-full"
                />
            </div>
            <div className="flex gap-1 col-span-full lg:col-span-2 2xl:col-span-1">
                <button className="w-full bg-blue-600 text-white p-2 font-bold text-lg rounded-lg hover:bg-blue-500 focus:outline-none">
                    Search
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="w-full bg-red-600 text-white p-2 font-bold text-lg rounded-lg hover:bg-red-500 focus:outline-none"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
