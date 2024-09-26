import React from 'react';
import useRecentView from '../../../Components/Hooks/useRecntView';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import useAuth from '../../../Components/Hooks/useAuth';


const RecentView = () => {
    const [recentViewProduct, loading] = useRecentView();
        const {user} = useAuth();
        const recentViewProducts = recentViewProduct.filter(item=> item?.userEmail===user?.email);
        console.log(recentViewProducts)
    // Loading state handling
    if (loading) {
        return <div>Loading recent views...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">Recently Viewed Products</h2>

                <Swiper
                    spaceBetween={30} // Space between slides
                    navigation // Enable navigation arrows
                    pagination={{ clickable: true }} // Enable pagination bullets
                    modules={[Navigation, Pagination]}
                    className="mySwiper my-8"
                    breakpoints={{
                        // Dynamic number of slides per view based on screen width
                        320: { slidesPerView: 1 }, // 1 slide on small screens (phones)
                        640: { slidesPerView: 2 }, // 2 slides on medium screens (tablets)
                        1024: { slidesPerView: 3 }, // 3 slides on large screens (desktops)
                        1280: { slidesPerView: 4 }, // 4 slides on extra large screens
                    }}
                >
                    {recentViewProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <Link to={`/productDetails/${product.id}`}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 max-w-sm mx-auto">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600 mt-2">{product.description}</p>
                                    <p className="text-xl font-bold text-green-600 mt-4">${product.price}</p>
                                </div>
                            </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default RecentView;
// bbbbbbb