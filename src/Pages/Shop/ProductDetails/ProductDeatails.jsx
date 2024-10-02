import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../Components/Hooks/useProducts';
import DeliveryDetails from './DeliveryDetails';
import Review from './Review';
import RecentView from '../RecentView/RecentView';
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { id } = useParams();
  const [products] = useProducts();
  const [activeTab, setActiveTab] = useState('details'); // State to track active tab

  const selectedProduct = products.find((p) => p._id === id);
  const handleWishlist = (id, image, price,name) => {
    const date = new Date().toLocaleDateString();
    const userEmail = user?.email;
    
    const info = { id, image, price, name, date, userEmail };
          console.log(info)
    axiosPublic.post("/wishlist", info)
      .then(response => {
        console.log("Recent view logged:", response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added In Wishlist Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error("Error logging recent view:", error);
      });
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 gap-4 bg-white my-10 rounded-lg">
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
              <p className="text-gray-400 text-lg">{selectedProduct.description}</p>
              <p className="text-xl font-bold"><span className='font-bold'>Price:</span> ${selectedProduct.price}</p>
              <p className="text-gray-500"><span className='font-bold'>Category:</span> {selectedProduct.category}</p>
              <p className="text-gray-500"><span className='font-bold'>Subcategory:</span> {selectedProduct.subCategory}</p>
              <p className="text-gray-500"><span className='font-bold'>Available Quantity:</span> {selectedProduct.quantity}</p>
              <p className="text-gray-500"><span className='font-bold'>Seller:</span> {selectedProduct.seller_name}</p>
              <p className="text-gray-500"><span className='font-bold'>Store:</span> {selectedProduct.store_name}</p>
              <p className="text-gray-500"><span className='font-bold'>Special Mention:</span> {selectedProduct.mention}</p>

              {/* Add to Cart and Wishlist buttons */}
              <div className="flex space-x-4 mt-4">
                <button className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-pink-600 transition-colors">
                  Add to Cart
                </button>
                <button onClick={()=>handleWishlist(selectedProduct._id,selectedProduct.image,selectedProduct.price,selectedProduct.name)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-300 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Daisy UI Tabs at the top */}
          <div role="tablist" className="tabs tabs-lifted items-center gap-4 w-1/2 border-b-2 mb-6">
            <button
              role="tab"
              className={`tab ${activeTab === 'details' ? 'tab-active' : ''}font-bold`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button
              role="tab"
              className={`tab ${activeTab === 'delivery' ? 'tab-active' : ''}font-bold`}
              onClick={() => setActiveTab('delivery')}
            >
              Delivery Details
            </button>
            <button
              role="tab"
              className={`tab  ${activeTab === 'reviews' ? 'tab-active' : ''}font-bold`}
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