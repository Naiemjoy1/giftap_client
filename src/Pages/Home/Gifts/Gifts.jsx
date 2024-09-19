import React from "react";
import GiftsCard from "./GiftsCard";
import "./gift.css"

const Gifts = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-10">
        {/* Left Banner */}
        <div className="relative group border rounded-xl overflow-hidden md:col-span-3">
          <img
            src="https://i.ibb.co/3C2tbKQ/Logo-wine-1024x1024.webp"
            className="h-[300px] md:h-[450px] w-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
            alt="Wine Logo"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 space-y-5 p-5">
            <h3 className="text-2xl md:text-3xl">Shop Online Gifts Under</h3>
            <p className="text-2xl md:text-3xl">$19.99</p>
            <button className="relative inline-flex items-center px-8 py-3 font-semibold text-gray-800 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-all duration-500 ease-in-out transform">
              <span className="absolute inset-0 w-full h-full transition duration-500 bg-white bg-opacity-20 rounded-full opacity-0 hover:opacity-100"></span>
              <span className="relative z-10">Shop Now</span>
            </button>
          </div>
        </div>

        {/* Right Banner */}
        <div className="relative group border rounded-xl overflow-hidden md:col-span-7">
          <img
            src="https://i.ibb.co/KKVDwFC/960x0.jpg"
            className="h-[300px] md:h-[450px] w-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
            alt="Home decor"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 space-y-5 p-5">
            <p className="text-lg md:text-xl">AMAZING GIFT</p>
            <h3 className="text-2xl md:text-3xl">30% Off Home Decor</h3>
            <p className="text-2xl md:text-3xl">$19.99</p>
            <button className="relative inline-flex items-center px-8 py-3 font-semibold text-gray-800 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-all duration-500 ease-in-out transform">
              <span className="absolute inset-0 w-full h-full transition duration-500 bg-white bg-opacity-20 rounded-full opacity-0 hover:opacity-100"></span>
              <span className="relative z-10">Shop Now</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-16 text-5xl">
      <h2 className="pacifico-regular text-3xl relative inline-block mb-4 after:content-[''] after:block after:w-full after:h-1 after:bg-transparent after:border-b-2 after:border-dashed after:border-gray-400 after:mt-4 after:translate-y-4">
  Gift kits & baskets
</h2>

      </div>
      <div className="mt-6">
        <GiftsCard />
      </div>
    </div>
  );
};

export default Gifts;
