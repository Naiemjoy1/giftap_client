import React from "react";
import { IoMdGift } from "react-icons/io";

const HomeSectionHeading = ({ subTitle, title }) => {
  return (
    <div>
      <div className="my-16">
        <p className="text-center mb-3 font-medium text-[#666666] items-center uppercase flex justify-center">
          <span className="mr-2 text-[25px] text-red-500">
            <IoMdGift />
          </span>{" "}
          {subTitle}
        </p>
        <h2 className="text-2xl md:text-3xl xl:text-4xl uppercase pb-5 font-bold text-center">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default HomeSectionHeading;
