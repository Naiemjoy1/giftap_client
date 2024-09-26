import React from 'react';

const DeliveryDetails = () => {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-3xl font-bold text-center mb-4">Delivery Details</h2>
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
                <h3 className="text-lg font-semibold">Standard Delivery</h3>
                <p>
                    Our standard delivery option is available at no extra cost. 
                    Your order will arrive within 5-7 business days.
                </p>
            </div>
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                <h3 className="text-lg font-semibold">Express Delivery</h3>
                <p>
                    Need it faster? Choose our express delivery service for a flat fee of $10. 
                    Get your order delivered within 2-3 business days!
                </p>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                <h3 className="text-lg font-semibold">International Shipping</h3>
                <p>
                    We offer international shipping to select countries. 
                    Delivery times may vary based on your location. 
                    Shipping costs will be calculated at checkout.
                </p>
            </div>
            <div className="bg-gray-100 border-l-4 border-gray-500 p-4">
                <h3 className="text-lg font-semibold">Tracking Your Order</h3>
                <p>
                    Once your order is shipped, you'll receive a tracking number via email. 
                    You can track your order in real-time on our website.
                </p>
            </div>
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    For further assistance, contact our support team at 
                    <a href="mailto:support@example.com" className="text-blue-500 underline"> GiftTab@gmail.com</a>.
                </p>
            </div>
        </div>
    );
};

export default DeliveryDetails;
