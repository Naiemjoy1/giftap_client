import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import img1 from "./../../../../assets/Images/Banner/img-1.jpg";
import img2 from "./../../../../assets/Images/Banner/img-2.png";
import img3 from "./../../../../assets/Images/Banner/img-3.png";

const Carousel = () => {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="w-full h-[450px] flex justify-center items-center rounded-md"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover", // Ensure the background image covers the area
              backgroundPosition: "center", // Center the background image
            }}
          >
            <div className="bg-primary text-center space-y-4 px-10 py-12 rounded-md">
              <p className="text-4xl font-poppins font-semibold">
                Unique Gifts
              </p>
              <p className="uppercase tracking-widest font-opensans">
                For every occasion
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[450px] bg-primary flex justify-center items-center py-10 px-20 gap-6 rounded-md">
            <section className="w-1/2 flex items-center justify-center">
              <img
                src={img2}
                alt=""
                className="object-cover h-full rounded-md"
              />
            </section>
            <section className="w-1/2 flex flex-col justify-center items-center gap-8">
              <p className="font-opensans">Stationary</p>
              <section className="flex flex-col justify-center items-center gap-2">
                <p className="text-4xl font-poppins font-semibold">
                  Sale 50% Off
                </p>
                <p className="uppercase tracking-widest font-opensans">
                  office & stationery
                </p>
              </section>
              <p className="uppercase font-opensans">from $09.99</p>
            </section>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[450px] bg-primary flex justify-center items-center py-10 px-20 gap-6 rounded-md">
            <section className="w-1/2 flex items-center justify-center">
              <img
                src={img3}
                alt=""
                className="object-cover h-full w-full rounded-md"
              />
            </section>
            <section className="w-1/2 flex flex-col justify-center items-center gap-8">
              <p className="font-opensans">New Arrival</p>
              <section className="flex flex-col justify-center items-center gap-2">
                <p className="text-4xl font-poppins font-semibold">
                  Send Your Love
                </p>
                <p className="uppercase tracking-widest font-opensans">
                  From <span>$29.99</span>
                </p>
              </section>
              <button className="btn btn-md btn-secondary rounded-full px-10">
                Send Gift
              </button>
            </section>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
