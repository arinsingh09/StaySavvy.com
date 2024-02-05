import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();

    const existingImageURLs = watch("imageURLs");

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageURL: string) => {
        event.preventDefault();
        setValue("imageURLs", existingImageURLs.filter((url) => url !== imageURL));
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {existingImageURLs && existingImageURLs.map((url, index) => (
                        <div key={index} className="relative">
                            <img src={url} className="w-full h-full object-cover rounded" alt={`Image ${index + 1}`} />
                            <button onClick={(event) => handleDelete(event, url)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full focus:outline-none z-10">Delete</button>
                        </div>
                    ))}
                </div>
                <input type="file" multiple accept="image/*" {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength = (imageFiles?.length || 0) + (existingImageURLs?.length || 0);

                        if (totalLength === 0) {
                            return "At least one image should be added";
                        }

                        if (totalLength > 6) {
                            return "Total number of images cannot be more than 6";
                        }

                        return true;
                    }
                })} className="mt-4" /> {/* Add margin-top to create space */}
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </div>
    );
};

export default ImagesSection;
