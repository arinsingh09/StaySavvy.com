import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
    hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr,3fr] border border-gray-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px] xl:h-auto relative">
                <img
                    src={hotel.imageURLs[0]}
                    className="w-full h-full object-cover object-center rounded-lg"
                    alt={hotel.name}
                />
            </div>
            <div className="grid grid-rows-[auto,auto,auto] gap-4">
                <div>
                    <div className="flex items-center">
                        {[...Array(hotel.starRating)].map((_, index) => (
                            <AiFillStar key={index} className="fill-yellow-400" />
                        ))}
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    <Link
                        to={`/detail/${hotel._id}`}
                        className="text-xl font-bold cursor-pointer hover:underline"
                    >
                        {hotel.name}
                    </Link>
                </div>

                <div className="line-clamp-4">{hotel.description}</div>

                <div className="grid grid-cols-2 gap-2 items-end">
                    <div className="flex flex-wrap gap-2">
                        {hotel.facilities.slice(0, 3).map((facility, index) => (
                            <span
                                key={index}
                                className="bg-gray-300 py-1 px-2 rounded-lg font-bold text-xs whitespace-nowrap"
                            >
                                {facility}
                            </span>
                        ))}
                        {hotel.facilities.length > 3 && (
                            <span className="text-sm text-gray-600">
                                +{hotel.facilities.length - 3} more
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-bold text-lg">₹{hotel.pricePerNight} per night</span>
                        <Link
                            to={`/detail/${hotel._id}`}
                            className="bg-blue-600 text-white py-2 px-4 font-bold text-lg rounded-lg hover:bg-blue-500"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;
