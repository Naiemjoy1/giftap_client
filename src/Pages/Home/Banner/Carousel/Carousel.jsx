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
          <div
            className="w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex justify-center items-center"
            style={{
              backgroundImage: `url(${img4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
           
              <div className="flex flex-col justify-center items-center space-y-5 text-center px-4">
                <p className="uppercase text-primary text-sm md:text-base font-medium">
                  print with perfection
                </p>
                <h3 className="text-[36px] md:text-[50px] lg:text-[90px] uppercase leading-tight md:leading-tight lg:leading-[102px] font-medium">
                  Gift More, <br />
                  Save More
                </h3>
                <p className="text-gray-500 text-sm md:text-xl">
                  Order By 6pm EST Dec. 19 for express shipping!
                </p>
                <div>
                  <button
                    className="btn text-white py-3 px-6 md:py-[16px] md:px-[40px] rounded-3xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-black hover:bg-red-700 transition-all duration-500 ease-in-out"
                    style={{ backgroundColor: "rgb(240, 72, 84)" }}
                  >
                    Shop The Sale
                  </button>
                </div>
              </div>
            
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div
            className="w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex justify-center items-center"
            style={{
              backgroundImage: `url(${img4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
           
              <div className="flex flex-col justify-center items-center space-y-5 text-center px-4">
                <p className="uppercase text-[#f04854] text-sm md:text-base font-medium">
                  print with perfection
                </p>
                <h3 className="text-[36px] md:text-[50px] lg:text-[90px] uppercase leading-tight md:leading-tight lg:leading-[102px] font-medium">
                  Gift More, <br />
                  Save More
                </h3>
                <p className="text-[#666666] text-sm md:text-xl">
                  Order By 6pm EST Dec. 19 for express shipping!
                </p>
                <div>
                  <button
                    className="btn text-white py-3 px-6 md:py-[16px] md:px-[40px] rounded-3xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-black hover:bg-primary transition-all duration-500 ease-in-out"
                    style={{ backgroundColor: "rgb(240, 72, 84)" }}
                  >
                    Shop The Sale
                  </button>
                </div>
              </div>
            
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div
            className="w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex justify-center items-center"
            style={{
              backgroundImage: `url(${img4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
              <div className="flex flex-col justify-center items-center space-y-5 text-center px-4">
                <p className="uppercase text-[#f04854] text-sm md:text-base font-medium">
                  print with perfection
                </p>
                <h3 className="text-[36px] md:text-[50px] lg:text-[90px] uppercase leading-tight md:leading-tight lg:leading-[102px] font-medium">
                  Gift More, <br />
                  Save More
                </h3>
                <p className="text-[#666666] text-sm md:text-xl">
                  Order By 6pm EST Dec. 19 for express shipping!
                </p>
                <div>
                  <button
                    className="btn text-white py-3 px-6 md:py-[16px] md:px-[40px] rounded-3xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-black hover:bg-red-700 transition-all duration-500 ease-in-out"
                    style={{ backgroundColor: "rgb(240, 72, 84)" }}
                  >
                    Shop The Sale
                  </button>
                </div>
              </div>
            
          </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default Carousel;
