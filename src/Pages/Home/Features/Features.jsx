import React from "react";
import FeaturesCard from "./FeaturesCard";

const Features = () => {
  return (
    <div>
      {/* <p>Features</p> */}
      <div className="container mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-10 gap-10">
          {/* Left Banner */}
          <div className="relative group border rounded-xl overflow-hidden md:col-span-5">
            <img
              src="https://i.postimg.cc/x1Q9ZCWx/jewellery-earrings-background-with-place-text-banner-fashion-accessories.jpg"
              className="h-[300px] md:h-[450px] w-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
              alt="Wine Logo"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 space-y-5 p-5">
              <p className="text-lg md:text-xl">Clearance Sale</p>
              <h3 className="text-2xl md:text-4xl font-bold">Woman's Day</h3>
              <button className="relative inline-flex items-center px-8 py-3 font-semibold text-white underline  rounded-full shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-all duration-500 ease-in-out transform">
                <span className="absolute inset-0 w-full h-full transition duration-500  bg-opacity-20 rounded-full opacity-0 hover:opacity-100"></span>
                <span className="relative z-10">Shop Now</span>
              </button>
            </div>
          </div>

          {/* Right Banner */}
          <div className="relative group border rounded-xl overflow-hidden md:col-span-5">
            <img
              src="https://i.postimg.cc/3rP8g99H/still-life-aesthetic-earrings.jpg"
              className="h-[300px] md:h-[450px] w-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
              alt="Home decor"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 space-y-5 p-5">
              <p className="text-lg md:text-xl">Holy Offer's</p>
              <h3 className="text-2xl md:text-4xl font-bold">Sale 50% Off</h3>
              <p className="text-2xl md:text-xl underline">CODE: GRS18</p>
 
            </div>
          </div>
        </div>


      </div>
      <FeaturesCard></FeaturesCard>
    </div>
  );
};

export default Features;
