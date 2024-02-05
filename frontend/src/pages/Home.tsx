import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
    const { data: hotels } = useQuery("fetchQuery", () => apiClient.fetchHotels());

    return (
        <div className="container mx-auto py-8 px-0">
            <div className="latest-destinations p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Latest Destinations</h2>
                <p className="text-sm text-gray-600 mb-6">Most recent destinations added by our hosts</p>
                <div className="grid md:grid-cols-2 gap-4">
                    {hotels?.map((hotel, index) => (
                        <LatestDestinationCard key={index} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;