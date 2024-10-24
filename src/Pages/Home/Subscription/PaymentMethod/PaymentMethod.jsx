import { Link } from "react-router-dom";

const PaymentMethod = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment</h1>
            <p className="text-lg text-gray-600 mb-8">
                Currently, we only accept Stripe payments. Please confirm your payment below.
            </p>

            {/* Confirm Payment Button */}
            <Link to={'/payment'}>
                <button
                    className="bg-primary text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    Confirm Payment
                </button>
            </Link>
        </div>
    );
}

export default PaymentMethod
