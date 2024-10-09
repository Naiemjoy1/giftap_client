<<<<<<< HEAD
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../Components/Hooks/useProducts';
import DeliveryDetails from './DeliveryDetails';
import Review from './Review';
import RecentView from '../RecentView/RecentView';
import Swal from 'sweetalert2';
=======
import { useParams } from "react-router-dom";
import useProducts from "../../../Components/Hooks/useProducts";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbVaccineBottleOff } from "react-icons/tb";
import Image from "./Image/Image";
import Middle from "./Middle/Middle";
import { useState } from "react";
import Description from "./Description/Description";
import ProductReview from "./Reviews/ProductReview";
import Information from "./Information/Information";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import RecentView from "../RecentView/RecentView";
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f

const ProductDeatails = () => {
  const { id } = useParams();
  const [products, loading] = useProducts();

<<<<<<< HEAD
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
=======
  const product = products.find((p) => p._id === id);
  const { name } = product ?? {};

  const [activeTab, setActiveTab] = useState("description");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-neutral py-10">
      <div className="container mx-auto space-y-10 px-4 lg:px-0">
        <div className="p-6 bg-white rounded-lg">
          <p className=" text-xl font-semibold">{name}</p>
          <div className="flex gap-4 text-xs mt-4">
            <section className="flex gap-2 items-center">
              <Rating style={{ maxWidth: 80 }} value={3} readOnly />
              <p className="uppercase">1 review</p>
            </section>
            <p>|</p>
            <p>
              <span className=" text-gray-400">SKU:</span> KTRL59
            </p>
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
          </div>
          <div className="lg:flex justify-between gap-8 mt-4 space-y-4">
            <Image product={product}></Image>

<<<<<<< HEAD
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
=======
            <Middle product={product}></Middle>
            <section className="lg:w-[30%] p-6 bg-gray-100 space-y-6 h-1/2">
              <p className="flex gap-4 text-sm">
                <span className=" text-xl">
                  <LiaShippingFastSolid />
                </span>
                Free Shipping apply to all orders over $100
              </p>
              <p className="flex gap-4 text-sm">
                <span className=" text-xl">
                  <TbVaccineBottleOff />
                </span>
                Guranteed 100% Organic from natural farmas
              </p>
              <p className="flex gap-4 text-sm">
                <span className=" text-xl">
                  <RiMoneyDollarCircleLine />
                </span>
                1 Day Returns if you change your mind
              </p>
            </section>
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg">
          <section className="flex gap-6 uppercase">
            <p
              onClick={() => setActiveTab("description")}
              className={`cursor-pointer ${
                activeTab === "description" ? "font-bold" : ""
              }`}
            >
              Description
            </p>
            <p
              onClick={() => setActiveTab("information")}
              className={`cursor-pointer ${
                activeTab === "information" ? "font-bold" : ""
              }`}
            >
              additional Information
            </p>
            <p
              onClick={() => setActiveTab("review")}
              className={`cursor-pointer ${
                activeTab === "review" ? "font-bold" : ""
              }`}
            >
              Review (0)
            </p>
          </section>
          <div className="divider divider-primary"></div>
          <section>
            {activeTab === "description" && <Description></Description>}
            {activeTab === "information" && <Information></Information>}
            {activeTab === "review" && (
              <ProductReview product={product}></ProductReview>
            )}
          </section>
        </div>
        <div className=" space-y-2">
          <p className=" uppercase text-lg font-medium">related products</p>
          <div className="p-4 bg-white rounded-lg ">
            <RelatedProducts id={id}></RelatedProducts>
          </div>
        </div>
        <div className=" space-y-2">
          <p className=" uppercase text-lg font-medium">
            recently viewed products
          </p>
          <div className="p-4 bg-white rounded-lg">
            <RecentView id={id}></RecentView>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ProductDetails;
=======
export default ProductDeatails;
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
