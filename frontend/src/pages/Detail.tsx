import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
    const { hotelId } = useParams();

    const { data: hotel } = useQuery("fetchHotelById", () =>
        apiClient.fetchHotelById(hotelId || ""), {
            enabled: !!hotelId, // if hotelId isn't given then don't run the query
        });

    if (!hotel) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
                <span className="flex text-yellow-400">
                    {Array.from({ length: hotel.starRating }, (_, index) => (
                        <AiFillStar key={index} />
                    ))}
                </span>
                <h1 className="text-3xl font-bold ml-2">{hotel.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {hotel.imageURLs.map((image, index) => (
                    <div key={index} className="rounded-md overflow-hidden">
                        <img
                            src={image}
                            alt={hotel.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {hotel.facilities.map((facility, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-3">
                        {facility}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr 1fr] gap-6">
                <div className="text-sm lg:text-base">{hotel.description}</div>
                <div>
                    <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
                </div>
            </div>
        </div>
    );
};

export default Detail;
