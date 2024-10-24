import React from "react";
import { Link } from "react-router-dom";

const ReUseCard = ({
  productTitle,
  productId,
  productImage,
  productPrice,
  productReview,
}) => {
  return (
    <>
      <div
        key={productId}
        className="max-w-[250px] bg-white rounded-lg cursor-pointer shadow-md overflow-hidden relative transform transition duration-300 flex flex-col justify-between"
      >
        <div className="relative">
          <img
            className="w-full h-28 object-cover"
            src={productImage}
            alt="Product Image"
          />
        </div>

        <div className="px-5 py-4 flex flex-col flex-grow justify-between text-center">
          <h3 className="text-black font-medium text-sm uppercase">
            {productTitle}
          </h3>
          <div className="flex items-center justify-center mt-2.5 mb-5">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-500">
                ★
              </span>
            ))}
            <span className="text-gray-600 ml-3">({productReview})</span>
          </div>

          {/* Ensure the button stays at the bottom */}
          <div className="flex flex-col items-center mt-auto">
            {/* Display the price */}
            <span className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
              ${productPrice}
            </span>

            {/* "View Details" Button */}
            <Link to={`/shop/${productId}`}>
              <button className="text-black py-2 border border-pink-400 hover:transition-colors hover:bg-primary hover:text-white px-4 rounded-lg font-semibold w-full">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReUseCard;



// import React, { useState } from "react"; // Import useState
// import { FaRegStar, FaHeart, FaSearch, FaExchangeAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const ReUseCard = ({
//   productTitle,
//   productId,
//   productImage,
//   productPrice,
//   productReview,
// }) => {
//   const [hoveredCard, setHoveredCard] = useState(null);



//   return (
//     <>
//       <div
//         key={productId}
//         className="max-w-[250px] bg-white rounded-lg cursor-pointer shadow-md overflow-hidden relative transform transition duration-300 hover:scale-105"
//         onMouseEnter={() => setHoveredCard(productId)}
//         onMouseLeave={() => setHoveredCard(null)}
//       >
//         <div className="relative">
//           <img
//             className="w-full h-28 object-cover"
//             src={productImage}
//             alt="Product Image"
//           />

//           {/* Icons for Quick View, Wishlist, and Compare */}
//           <div
//             className={`absolute inset-x-0 bottom-0 flex justify-center space-x-4 pb-3 transition-all duration-300 transform ${hoveredCard === productId
//               ? "translate-y-0 opacity-100"
//               : "translate-y-8 opacity-0"
//               }`}
//           >
//             {/* Quick View button with tooltip */}
//             <div className="relative group">
//               <Link to={`/shop/${productId}`}>
//                 <button className="bg-white p-2 rounded-full shadow hover:text-[#F25E68] transition-colors">
//                   <FaSearch size={18} />
//                 </button>
//               </Link>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//                 Quick View
//               </div>
//             </div>


//             <div className="relative group">
//               <button className="bg-white p-2 rounded-full shadow hover:text-[#F25E68] transition-colors">
//                 <FaHeart size={18} />
//               </button>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//                 Add to Wishlist
//               </div>
//             </div>


//             <div className="relative group">
//               <button className="bg-white p-2 rounded-full shadow hover:text-[#F25E68] transition-colors">
//                 <FaExchangeAlt size={18} />
//               </button>
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//                 Compare
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="px-5 py-4 text-center">
//           <h3 className="text-black font-medium text-sm uppercase">{productTitle}</h3>
//           <div className="flex items-center justify-center mt-2.5 mb-5">
//             <span className="text-yellow-500">
//               <FaRegStar />
//             </span>
//             <span>
//               <FaRegStar />
//             </span>
//             <span>
//               <FaRegStar />
//             </span>
//             <span>
//               <FaRegStar />
//             </span>
//             <span>
//               <FaRegStar />
//             </span>
//             <span className="text-gray-600 ml-3">({productReview})</span>
//           </div>

//           <div className="flex justify-center items-center relative h-12">

//             <span
//               className={`text-lg md:text-2xl font-bold text-gray-900 transition-opacity duration-300 ${hoveredCard === productId ? "opacity-0" : "opacity-100"
//                 }`}
//             >
//               ${productPrice}
//             </span>


//             <button
//               className={`text-black py-2 hover:border hover:text-[#F04854] hover:border-pink-400 px-4 rounded-lg font-semibold absolute bottom-0 transition-all duration-300 ease-in-out transform ${hoveredCard === productId
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-12 opacity-0"
//                 }`}
//             >
//               Add to Cart +
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReUseCard;
