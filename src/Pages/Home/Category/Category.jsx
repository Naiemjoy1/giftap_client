import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { IoMdGift } from "react-icons/io";

const Category = () => {
  const [product, setProduct] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get("/products");
        setProduct(response.data);
      } catch (error) {
        console.log("Internal server error", error);
      }
    };
    fetchProducts();
  }, [axiosPublic]);

  return (
    <div className="bg-[linear-gradient(109deg,_rgba(222,196,227,1)_0%,_rgba(222,196,227,1)_15%,_rgba(210,207,230,1)_31%,_rgba(236,202,228,1)_55%,_rgba(244,232,236,1)_69%,_rgba(222,205,231,1)_100%,_rgba(0,212,255,1)_100%)] min-h-screen flex justify-center items-center">
      <div className="py-6 px-4 w-full max-w-6xl">
        <p className="text-center mb-3 font-medium text-[#666666] items-center uppercase flex justify-center">
          <span className="mr-2 text-[25px] text-red-500">
            <IoMdGift />
          </span>{" "}
          Shop with giftap
        </p>
        <h2 className="text-4xl uppercase pb-5 font-bold text-center">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-y-10 gap-x-5">
          {product.slice(0, 8).map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 font-medium text-sm md:text-base">
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:text-white dark:focus:ring-pink-800 shadow transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              See All
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
