import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({
                message: "Signed out!",
                type: "SUCCESS",
            });
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR",
            });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        <button
            onClick={handleClick}
            className="text-blue-600 px-3 py-2 font-bold bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
