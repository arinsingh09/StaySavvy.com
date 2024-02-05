import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4">
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
                <h1 className="text-3xl lg:text-4xl text-white font-semibold tracking-tight">
                    <Link to="/" className="text-white hover:text-gray-300">Stay<span className="text-blue-400">Savvy</span>.com</Link>
                </h1>
                <nav className="flex space-x-8 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link to="/my-bookings" className="text-white hover:text-gray-300 font-medium">Bookings History</Link>
                            <Link to="/my-hotels" className="text-white hover:text-gray-300 font-medium">My Hotels</Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link to="/signin" className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-300 transition duration-300 ease-in-out font-medium">
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
