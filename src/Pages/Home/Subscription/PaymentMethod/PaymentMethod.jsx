import { Link } from "react-router-dom";

const PaymentMethod = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-primary to-[#F04854] text-white text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold mb-4">We Are Currently Under Maintenance</h1>
                <p className="text-lg mb-8">
                    We're working hard to improve our website. Please check back later!
                </p>

                <div className="flex justify-center space-x-4">
                    <Link to={'/contact'}>
                        <button className="bg-white text-[#F25E68] px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">
                            Contact Us
                        </button>
                    </Link>
                    <Link to={'/'}>
                        <button className="border-2 border-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#F25E68] transition">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentMethod
