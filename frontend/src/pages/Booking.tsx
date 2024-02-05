import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
    const { stripePromise } = useAppContext()
    const search = useSearchContext();
    const { hotelId } = useParams();

    const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId as string), {
        enabled: !!hotelId,
    });

    const [numberOfNights, setNumberOfNights] = useState<number>(1);

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = search.checkIn.getTime() === search.checkOut.getTime() ? 1 : Math.ceil(Math.abs(search.checkIn.getTime() - search.checkOut.getTime()) / (1000 * 60 * 60 * 24));

            setNumberOfNights(nights);
        }
    }, [search.checkIn, search.checkOut]);

    const { data: paymentIntentData } = useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()), {
        enabled: !!hotelId && numberOfNights > 0,
    })

    const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

    if (!hotel) {
        return <></>
    }

    return <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,2fr] lg:gap-16">
        <div>
            <BookingDetailsSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNights={numberOfNights} hotel={hotel} />
        </div>
        {currentUser && paymentIntentData && (
            <Elements stripe={stripePromise} options={{
                clientSecret: paymentIntentData.clientSecret,
            }}
            >
                <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
            </Elements>
        )}
    </div>
}

export default Booking;