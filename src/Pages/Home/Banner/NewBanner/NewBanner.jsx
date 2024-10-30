import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slide1 from "./Slide1/Slide1";
import Slide3 from "./Slide3/Slide3";
import Slide2 from "./Slide2/Slide2";

const NewBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const totalSlides = 3;

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides ? 1 : prevSlide + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 1 ? totalSlides : prevSlide - 1
    );
  };

  return (
    <div className="h-[80vh] relative bg-[#edeef1]">
      {/* Slide 1 */}
      <div
        className={` h-full flex items-center justify-center absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentSlide === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Slide1></Slide1>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-white border-none btn-sm absolute top-1/2 right-4 -translate-y-1/2"
        >
          <IoIosArrowForward />
        </button>
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-white border-none btn-sm absolute top-1/2 left-4 -translate-y-1/2"
        >
          <IoIosArrowBack />
        </button>
      </div>

      {/* Slide 2 */}
      <div
        className={` h-full flex items-center justify-center absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentSlide === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Slide2></Slide2>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-white border-none btn-sm absolute top-1/2 right-4 -translate-y-1/2"
        >
          <IoIosArrowForward />
        </button>
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-white border-none btn-sm absolute top-1/2 left-4 -translate-y-1/2"
        >
          <IoIosArrowBack />
        </button>
      </div>

      {/* Slide 3 */}
      <div
        className={` h-full flex items-center justify-center absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentSlide === 3 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Slide3></Slide3>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-white border-none btn-sm absolute top-1/2 right-4 -translate-y-1/2"
        >
          <IoIosArrowForward />
        </button>
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-white border-none btn-sm absolute top-1/2 left-4 -translate-y-1/2"
        >
          <IoIosArrowBack />
        </button>
      </div>
    </div>
  );
};

export default NewBanner;
