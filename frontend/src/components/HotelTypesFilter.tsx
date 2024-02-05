import { hotelTypes } from "../config/hotel-options-config";

type Props = {
    selectedHotelTypes: string[],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        <div className="border-b border-gray-300 pb-5">
            <h4 className="text-lg font-semibold mb-2">Hotel Type</h4>
            <div className="space-y-2">
                {hotelTypes.map((hotelType, index) => (
                    <label key={index} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="rounded"
                            value={hotelType}
                            checked={selectedHotelTypes.includes(hotelType)}
                            onChange={onChange}
                        />
                        <span>{hotelType}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default HotelTypesFilter;
