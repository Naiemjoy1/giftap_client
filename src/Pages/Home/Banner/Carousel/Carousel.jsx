import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [banner, setBanner] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get("/banner")
      .then((response) => {
        setBanner(response.data);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }, [axiosPublic]);

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
        {banner.map(
          (ban) =>
            ban.type === "running" && (
              <SwiperSlide key={ban._id}>
                <div className="max-h-[70vh] flex items-center justify-center bg-gray-100">
                  <div>
                    <img
                      className="max-h-full object-contain"
                      src={ban.bannerUrl}
                      alt="Banner"
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
};

export default Carousel;
