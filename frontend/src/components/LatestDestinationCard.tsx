import { Link } from 'react-router-dom';
import { HotelType } from '../../../backend/src/shared/types';

type Props = {
    hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
    return (
        <Link to={`/detail/${hotel._id}`} className="relative block overflow-hidden rounded-md shadow-md">
            <div className="h-60 sm:h-72">
                <img
                    src={hotel.imageURLs[0]}
                    className="w-full h-full object-cover object-center transition duration-300 transform hover:scale-105"
                    alt={hotel.name}
                />
            </div>

            <div className="absolute inset-x-0 bottom-0 px-4 py-2 bg-black bg-opacity-70 rounded-b-md">
                <h2 className="text-white font-bold text-lg sm:text-xl">{hotel.name}</h2>
            </div>
        </Link>
    );
};

export default LatestDestinationCard;
