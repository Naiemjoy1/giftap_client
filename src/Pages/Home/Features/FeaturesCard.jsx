import React from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const FeaturesCard = () => {
  return (
    <div className="mx-auto container">

      <h1 className="text-center font-bold text-4xl">Feature items</h1>

      <div className="max-w-xs bg-white rounded-lg shadow-md p-4 border border-blue-400">
        <div className="flex justify-center">
          <img
            src="https://i.postimg.cc/VsMjN3py/21.jpg"
            alt="Hallmark Stuffed Snoopy"
            className="w-40 h-40 object-cover"
          />
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="p-2 bg-gray-200 rounded-full">
            <FaShoppingCart className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full">
            <FaHeart className="text-gray-600" />
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg font-bold">$132</p>
          <p className="text-sm font-semibold text-black">Hallmark Stuffed Snoopy</p>
          <div className="flex justify-center items-center mt-2">
            <Rating
              style={{ maxWidth: 100 }}
              value={4}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesCard;
