import { useState, useEffect } from "react";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";
import { Link } from "react-router-dom";

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

  const category = product.reduce((acc, current) => {
    const categoryExists = acc.find(
      (item) => item.category === current.category
    );
    if (!categoryExists) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <div>
      <HomeSectionHeading
        subTitle={"shop with giftap"}
        title={"Shop by category"}
      />

      <div className="container 2xl:w-[70%] mx-auto px-4">
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
              items: 6,
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
                min: 512,
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
          {category.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-center items-center px-4"
            >
              <Link to={`/category/${item.category}`}>
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={item.image.cardImg1}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>

              <p className="font-medium mt-4">{item.category}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Category;
