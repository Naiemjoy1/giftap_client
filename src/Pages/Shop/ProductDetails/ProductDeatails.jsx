import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../Components/Hooks/useProducts';
import DeliveryDetails from './DeliveryDetails';
import Review from './Review';
import RecentView from '../RecentView/RecentView';

const ProductDetails = () => {
  const { id } = useParams();
  const [products] = useProducts();
  const [activeTab, setActiveTab] = useState('details'); // State to track active tab

  const selectedProduct = products.find((p) => p._id === id);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {selectedProduct ? (
        <>
          {/* Product Image and Basic Info */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">{selectedProduct.name}</h2>
              <p className="text-gray-600 text-lg">{selectedProduct.description}</p>
              <p className="text-xl font-semibold">Price: ${selectedProduct.price}</p>
              <p className="text-green-500 font-semibold">Discount: {selectedProduct.discount}%</p>
              <p className="text-gray-500">Category: {selectedProduct.category}</p>
              <p className="text-gray-500">Subcategory: {selectedProduct.subCategory}</p>
              <p className="text-gray-500">Available Quantity: {selectedProduct.quantity}</p>
              <p className="text-gray-500">Seller: {selectedProduct.seller_name}</p>
              <p className="text-gray-500">Store: {selectedProduct.store_name}</p>
              <p className="text-gray-500">Special Mention: {selectedProduct.mention}</p>

              {/* Add to Cart and Wishlist buttons */}
              <div className="flex space-x-4 mt-4">
                <button className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-pink-600 transition-colors">
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-300 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Daisy UI Tabs at the top */}
          <div role="tablist" className="tabs border-b-2 mb-6">
            <button
              role="tab"
              className={`tab tab-lifted ${activeTab === 'details' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button
              role="tab"
              className={`tab tab-lifted ${activeTab === 'delivery' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('delivery')}
            >
              Delivery Details
            </button>
            <button
              role="tab"
              className={`tab tab-lifted ${activeTab === 'reviews' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Product Description</h3>
                <p className="text-gray-600">
                  Explore our stylish collection of {selectedProduct.name}, perfect for home décor and eco-friendly gifting.
                  This product is made with high-quality materials and available exclusively from {selectedProduct.store_name}.
                </p>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div>
                <DeliveryDetails />
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <Review reviews={selectedProduct.reviews} />
              </div>
            )}
            <div>
              <RecentView></RecentView>
            </div>
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
