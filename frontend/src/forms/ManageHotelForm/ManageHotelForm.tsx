import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string,
    city: string,
    country: string,
    description: string,
    type: string,
    pricePerNight: number,
    starRating: number,
    facilities: string[],
    imageFiles: FileList,
    imageURLs: string[],
    adultCount: number,
    childCount: number,
}

type Props = {
    hotel?: HotelType,
    onSave: (hotelFormData: FormData) => void,
    isLoading: boolean,
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(hotel);
    }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJSON: HotelFormData) => {
        // create new formData object and call our API
        const formData = new FormData();
        if (hotel) { // if we are on edit mode
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJSON.name);
        formData.append("city", formDataJSON.city);
        formData.append("country", formDataJSON.country);
        formData.append("description", formDataJSON.description);
        formData.append("type", formDataJSON.type);
        formData.append("pricePerNight", formDataJSON.pricePerNight.toString());
        formData.append("starRating", formDataJSON.starRating.toString());
        formData.append("adultCount", formDataJSON.adultCount.toString());
        formData.append("childCount", formDataJSON.childCount.toString());

        formDataJSON.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        });

        if (formDataJSON.imageURLs) {
            formDataJSON.imageURLs.forEach((url, index) => {
                formData.append(`imageURLs[${index}]`, url);
            })
        }

        Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

        onSave(formData);
    })

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button disabled={isLoading} type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 rounded-lg">
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm;