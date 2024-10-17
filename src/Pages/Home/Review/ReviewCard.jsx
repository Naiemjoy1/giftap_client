import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ singleReview }) => {
  const { user_image, user_name, profession, rating, review } = singleReview;
  return (
    <div className="bg-white border w-[300px] rounded-2xl p-5">
      <div className="flex items-center space-x-5">
        <img className="w-14 h-14 rounded-full" src={user_image} alt="" />
        <div>
          <h1 className="text-base font-semibold">{user_name}</h1>
          <h1>{profession}</h1>
          <h1 className="flex space-x-1 mt-1 text-yellow-300 text-sm">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </h1>
        </div>
      </div>
      <div class="border-b-2 border-slate-300 mt-5 ..."></div>
      <h1 className="mt-4 text-base font-medium">{review}</h1>
    </div>
  );
};

export default ReviewCard;
