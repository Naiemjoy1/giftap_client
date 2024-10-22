import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

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
          <div className="h-[70vh] flex items-center justify-center bg-gray-100">
            <div>
              <img
                className="max-h-full object-contain"
                src="https://i.ibb.co/Tt4z6zZ/Green-and-Yellow-Simple-Clean-Shoes-Sale-Banner-1.png"
                alt="Banner"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-[70vh] flex items-center justify-center bg-gray-100">
            <div>
              <img
                className="max-h-full object-contain"
                src="https://i.ibb.co.com/6tR71tb/Simple-Modern-Photo-Collage-Autumn-Fashion-Sale-Banner-1.png"
                alt="Fashion"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[70vh] flex items-center justify-center bg-gray-100">
            <div>
              <img
                className="max-h-full object-contain"
                src="https://i.ibb.co.com/zbHkDSF/Grey-Minimalist-Special-Offer-Banner-Landscape-1.png"
                alt="Fashion"
              />
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Carousel;
