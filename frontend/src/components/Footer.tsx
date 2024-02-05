import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
                <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
                <Link to="/" className="text-white hover:text-gray-300">Stay<span className="text-blue-400">Savvy</span>.com</Link>
                </h2>
                <nav className="flex gap-6">
                    <Link to="#" className="text-gray-300 hover:text-gray-100">Privacy Policy</Link>
                    <Link to="#" className="text-gray-300 hover:text-gray-100">Terms of Service</Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
