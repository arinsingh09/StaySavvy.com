type Props = {
    selectedPrice?: number,
    onChange: (value?: number) => void,
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
        <div className="max-w-xs mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h4 className="text-lg font-semibold mb-2">Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice}
                onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}
            >
                <option value="">Select Max Price</option>
                {[10000, 20000, 30000, 40000, 50000].map((price) => (
                    <option key={price} value={price}>₹{price}</option>
                ))}
            </select>
        </div>
    );
};

export default PriceFilter;
