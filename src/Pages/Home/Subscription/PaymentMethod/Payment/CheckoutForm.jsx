import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../../Components/Hooks/useAxiosSecure";
import useAuth from "../../../../../Components/Hooks/useAuth";

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handlePlanSelection = (price) => {
        setSelectedPlan(price);
    };

    useEffect(() => {
        if (selectedPlan) {
            axiosSecure.post('/create-payment-intent', { price: selectedPlan })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, selectedPlan]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: error.message,
            });
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous email',
                    name: user?.displayName || 'anonymous name'
                }
            }
        });

        if (confirmError) {
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: "Payment failed. Please try again.",
            });
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user?.email,
                    price: selectedPlan,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                };
                const res = await axiosSecure.post('/payments', payment);
                if (res.data?.paymentResult?.insertedId) {
                    navigate('/payment/invoice');
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful",
                        text: `Thank you! Your payment for $${selectedPlan} was successful!`,
                        timer: 1500,
                    });
                }
            }
        }
    };

    return (
        <>
            {!selectedPlan ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
                    <button
                        onClick={() => handlePlanSelection(24.90)}
                        className="inline-flex items-center justify-center w-full px-4 py-3 mb-4 text-base font-bold leading-6 text-white bg-blue-500 rounded-full hover:bg-blue-600">
                        Premium - $24.90
                    </button>
                    <button
                        onClick={() => handlePlanSelection(49.90)}
                        className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-bold leading-6 text-white bg-purple-500 rounded-full hover:bg-purple-600">
                        Luxury - $49.90
                    </button>
                </div>
            ) : (
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
                    {error && <p className="text-red-600">{error}</p>}
                    {transactionId && <p className="text-green-500">Transaction ID: {transactionId}</p>}
                    <button
                        className="inline-flex items-center justify-center w-full px-4 py-3 mt-5 text-base font-bold leading-6 text-white bg-green-500 rounded-full hover:bg-green-600"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay Now
                    </button>
                </form>
            )}
        </>
    );
};

export default CheckOutForm;
