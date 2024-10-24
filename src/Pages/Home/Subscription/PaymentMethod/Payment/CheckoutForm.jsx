import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../../../Components/Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Prices for Premium and Luxury plans
    const [selectedPlan, setSelectedPlan] = useState(24.90);

    useEffect(() => {
        if (selectedPlan > 0) {
            axiosSecure.post('/stripePayment/create-payment-intent', { price: selectedPlan })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error("Error creating payment intent", error);
                });
        }
    }, [axiosSecure, selectedPlan]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe has not loaded yet.");
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            console.log("CardElement not found.");
            return;
        }

        // Create payment method
        const { error: cardError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            },
        });

        if (cardError) {
            console.error("Error creating payment method:", cardError.message);
            setError(cardError.message);
            return;
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            },
        });

        if (confirmError) {
            console.error("Error confirming payment:", confirmError.message);
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            Swal.fire({
                position: 'top-right',
                icon: 'success',
                title: `Congratulation You Are ${selectedPlan === 49.90 ? 'Luxury' : 'Premium'} Member`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')

        } else {
            console.error('Payment failed:', paymentIntent.status);
        }
    };

    return (
        <>
            <div className="mb-5">
                <h2 className="text-2xl font-semibold">Select a Plan</h2>
                <div className="flex space-x-4 mt-4">
                    <button
                        className={`px-4 py-2 rounded ${selectedPlan === 24.90 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedPlan(24.90)}
                    >
                        Premium - $24.90
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${selectedPlan === 49.90 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedPlan(49.90)}
                    >
                        Luxury - $49.90
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="border-2 border-blue-400 p-5"
                />
                {error && <p className="text-red-600 font-bold text-lg mt-3">{error}</p>}
                {transactionId && (
                    <p className="text-green-500 font-bold text-lg mt-3">
                        Payment Successful! Transaction ID: {transactionId}
                    </p>
                )}
                <button
                    className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay Now
                </button>
            </form>
        </>
    );
};

export default CheckOutForm;
