import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import img4 from "./../../../../assets/Images/Banner/Mask_group_48.webp";

const Carousel = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >


        <SwiperSlide>
          <div className="">
            <div>
              <img className="" src="https://i.ibb.co.com/Tt4z6zZ/Green-and-Yellow-Simple-Clean-Shoes-Sale-Banner-1.png" alt="" />
            </div>
          </div>
        </SwiperSlide>



      </Swiper>
    </div>
  );
};

export default Carousel;
