<<<<<<< HEAD
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
    const { user } = useAuth();

   
    const recentViewProducts = recentViewProduct
        .filter(item => item?.userEmail === user?.email)
        .sort((a, b) => new Date(b.date) - new Date(a.date)) 
        .slice(0, 6); 

    console.log(recentViewProducts);

   
    if (loading) {
        return <div>Loading recent views...</div>;
=======
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import useRecentView from "../../../Components/Hooks/useRecntView";
import { Link } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";
import useCart from "../../../Components/Hooks/useCart";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useProducts from "../../../Components/Hooks/useProducts";

const RecentView = ({ id }) => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const axiosPublic = useAxiosPublic();
  const [products, loading] = useProducts();
  const [recentviews] = useRecentView();

  const usersDetails = users.find((u) => u?.email === user?.email);

  const userRecents = recentviews.filter(
    (recent) => recent.email === user?.email
  );

  const recentProducts = products.filter((product) =>
    userRecents.some((recent) => recent.productId === product._id)
  );

  const filteredRecentProducts = recentProducts.filter(
    (recent) => recent._id !== id
  );

  const calculateDiscountedPrice = (price, discount) => {
    return discount ? price * (1 - discount / 100) : price;
  };

  const handleAddToCart = async (recent) => {
    const discountedPrice = calculateDiscountedPrice(
      recent.price,
      recent.discount
    ).toFixed(2);

    let deliveryData;
    if (recent.category === "digital gift") {
      deliveryData = selectedDelivery === "localPickup" ? date : "instant";
    } else {
      deliveryData = "home";
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
    }

    const purchase = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: recent._id,
      price: discountedPrice,
      quantity: 1,
      name: recent.name,
      image: recent.image.itemImg1,
      delivery: deliveryData,
      category: recent.category,
    };

<<<<<<< HEAD
                <Swiper
                    spaceBetween={30} 
                    navigation 
                    pagination={{ clickable: true }} 
                    modules={[Navigation, Pagination]}
                    className="mySwiper my-8"
                    breakpoints={{
                       
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
=======
    try {
      const res = await axiosPublic.post("/carts", purchase);
      if (res.status === 200) {
        toast.success("Product added to cart");
        refetch();
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
>>>>>>> 232f37ae29c10ab2e7fb7cc41cda512684701e2f
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {filteredRecentProducts.slice(0, 4).map((recent) => (
        <div className="relative group" key={recent._id}>
          <figure>
            <img src={recent.image.itemImg1} alt={recent.name} />
          </figure>
          <div className="mt-4 space-y-2">
            <p className="text-lg font-medium">
              {recent.name.length > 20
                ? `${recent.name.slice(0, 20)}...`
                : recent.name}
            </p>

            {recent.category === "digital gift" ? (
              <p className="text-green-600 uppercase text-xs">In Stock</p>
            ) : recent.quantity > 0 ? (
              <p className="text-green-600 uppercase text-xs">In Stock</p>
            ) : (
              <p className="uppercase text-sm text-red-700">Out of Stock</p>
            )}

            <p className="flex gap-2 items-center">
              <Rating
                style={{ maxWidth: 80 }}
                value={recent.rating || 3}
                readOnly
              />
              <span>{recent.rating || 3}</span>
            </p>

            {recent.category === "digital gift" ? (
              <div className="flex justify-start items-center gap-2 text-sm">
                {recent.priceGroup.map((pkg, index) => (
                  <p
                    key={index}
                    className="bg-primary text-white px-2 rounded-full font-medium"
                  >
                    {pkg.tier}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">
                $
                {calculateDiscountedPrice(
                  recent.price,
                  recent.discount
                ).toFixed(2)}{" "}
                {recent.discount && (
                  <span className="text-gray-400 line-through ml-2">
                    ${recent.price.toFixed(2)}
                  </span>
                )}
              </p>
            )}

            {recent.category === "digital gift" ? (
              <Link
                to={`/shop/${recent._id}`}
                className="btn btn-outline btn-primary w-full rounded-full"
              >
                See More
              </Link>
            ) : (
              <button
                onClick={() => handleAddToCart(recent)}
                className="btn btn-outline btn-primary w-full rounded-full"
              >
                Add to cart
              </button>
            )}
          </div>

          {recent.discount && (
            <div className="absolute left-2 top-2">
              <p className="px-2 text-white bg-primary rounded-lg">
                {recent.discount}%
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 absolute top-4 right-4 transform translate-x-full opacity-0 invisible transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible">
            <button className="bg-white shadow-xl p-2 rounded-full text-lg">
              <BsArrowsFullscreen />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentView;
