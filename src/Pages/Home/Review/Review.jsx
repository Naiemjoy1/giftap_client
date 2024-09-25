import React from "react";
import { FaStar } from "react-icons/fa";

const Review = () => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-purple-200 to-purple-300">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 40 40%27 width=%2740%27 height=%2740%27%3E%3Cpath fill=%27none%27 stroke=%27%23e1e1e1%27 stroke-width=%271%27 d=%27M0 39.5H40M39.5 0V40%27/%3E%3C/svg%3E')] opacity-50"></div>

        {/* Your customer review cards go here */}
        <div className="relative z-10 p-8">
          <h1 className="text-center text-3xl font-medium">
            CUSTOMERS REVIEWS
          </h1>
          <h1 className="text-center text-base font-medium mt-4">
            We do everything we can do ensure a positive merchant experience
          </h1>
          <div className="flex justify-center items-center space-x-5 mt-4">
            <h1 className="text-xl font-bold  text-green-600">4.9 / 5</h1>
            <div className="flex space-x-2 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h1 className="text-base font-semibold">
              Trusted by 199, 087 clients
            </h1>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default Review;
