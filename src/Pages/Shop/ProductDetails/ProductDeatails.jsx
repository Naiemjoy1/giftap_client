import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../Components/Hooks/useProducts';
import DeliveryDetails from './DeliveryDetails';
import Review from './Review';

const ProductDetails = () => {
    const { id } = useParams();
    const [products] = useProducts();
    const [activeTab, setActiveTab] = useState('details'); // State to track active tab

    const selectedProduct = products.find(p => p._id === id);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {selectedProduct ? (
                <>
                    {/* Daisy UI Tabs at the top */}
                    <div role="tablist" className="tabs tabs-lifted mb-6">
                        <a
                            role="tab"
                            className={`tab ${activeTab === 'details' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('details')}
                        >
                            Product Details
                        </a>
                        <a
                            role="tab"
                            className={`tab ${activeTab === 'delivery' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('delivery')}
                        >
                            Delivery Details
                        </a>
                        <a
                            role="tab"
                            className={`tab ${activeTab === 'reviews' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </a>
                    </div>

                    {/* Product Image and Basic Info */}
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full md:w-80 h-auto object-cover rounded-lg"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
                            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                            <p className="text-lg font-semibold mb-2">Price: ${selectedProduct.price}</p>
                            <p className="text-green-500 mb-2">Discount: {selectedProduct.discount}</p>
                            <p className="mb-2">Category: {selectedProduct.category}</p>
                            <p className="mb-2">Subcategory: {selectedProduct.subCategory}</p>
                            <p className="mb-2">Quantity Available: {selectedProduct.quantity}</p>
                            <p className="mb-2">Seller: {selectedProduct.seller_name} ({selectedProduct.store_name})</p>
                            <p className="mb-2">Special Mention: {selectedProduct.mention}</p>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-8">
                        {/* Product Details Content */}
                        {activeTab === 'details' && (
                            <div>
                                <h3 className="text-lg font-semibold mt-4">Details</h3>
                                <p>Explore our stylish collection of {selectedProduct.name}. Perfect for home décor and eco-friendly gifting.</p>
                                <p>Available exclusively from {selectedProduct.store_name}.</p>
                            </div>
                        )}

                        {/* Delivery Details Content */}
                        {activeTab === 'delivery' && (
                            <div>
                                <DeliveryDetails />
                            </div>
                        )}

                        {/* Reviews Content */}
                        {activeTab === 'reviews' && (
                            <div>
                                <Review reviews={selectedProduct.reviews} />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
};

export default ProductDetails;
