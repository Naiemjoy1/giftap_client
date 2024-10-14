import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";

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
    <div>
      {/* this is section heading this style get homeSectionHeading components */}
      <HomeSectionHeading
        subTitle={"shop with giftap"}
        title={"Shop by category"}
      ></HomeSectionHeading>

      {/* Center the carousel container */}
      <div className="max-w-screen-xl mx-auto">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 3,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {product.slice(0, 10).map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-center items-center p-4"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                <img
                  src={item.image.cardImg1}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-lg font-medium mt-4">{item.name}</p>
            </div>
          ))}
        </Carousel>
        <div className="flex justify-center">
          <button
            className="btn text-white py-3 px-6 md:py-[16px] md:px-[40px] rounded-3xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-black hover:bg-red-700 transition-all duration-500 ease-in-out"
            style={{ backgroundColor: "rgb(240, 72, 84)" }}
          >
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
