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
import useReviews from "../../../Components/Hooks/useReviews";
import useWishs from "../../../Components/Hooks/useWishs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecentView = ({ id }) => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const axiosPublic = useAxiosPublic();
  const [products, loading] = useProducts();
  const [recentviews] = useRecentView();
  const [reviews] = useReviews();
  const [wishlists, refetchWish] = useWishs();

  const usersDetails = users.find((u) => u?.email === user?.email);
  const usersWishs = wishlists.filter((wish) => wish.email === user?.email);

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
      deliveryData = "instant";
    } else {
      deliveryData = "home";
    }

    const purchase = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: recent._id,
      price: discountedPrice,
      quantity: 1,
      name: recent.name,
      image: recent.image.cardImg1,
      delivery: deliveryData,
      category: recent.category,
    };

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

  const handleAddTowish = async (item) => {
    const wishProduct = usersWishs.find((wish) => wish.productId === item._id);

    if (wishProduct) {
      toast.error("Product is already in your wishlist");
      return;
    }

    const Wishlist = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: item._id,
    };

    try {
      const res = await axiosPublic.post("/wishlists", Wishlist);
      if (res.status === 200) {
        refetchWish();
        toast.success("Product added to wishlist");
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (error) {
      toast.error("Error adding to wishlist");
    }
  };

  const handleRemove = async (wishlistId) => {
    try {
      const res = await axiosPublic.delete(`/wishlists/${wishlistId}`);
      if (res.data.acknowledged && res.data.deletedCount > 0) {
        refetchWish();
        toast.success("Product removed from wishlist");
      } else {
        toast.error("Failed to remove product from wishlist");
      }
    } catch (error) {
      toast.error("Error removing product from wishlist");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {filteredRecentProducts.slice(0, 4).map((recent) => {
        const wishProduct = usersWishs.find(
          (wish) => wish.productId === recent._id
        );

        const productReviews = reviews.filter(
          (review) => review.productId === recent._id
        );

        const averageRating =
          productReviews?.length > 0
            ? (
                productReviews?.reduce(
                  (sum, review) => sum + review.rating,
                  0
                ) / productReviews?.length
              ).toFixed(1)
            : 0;

        return (
          <div className="relative group" key={recent._id}>
            <figure>
              <img src={recent.image.cardImg1} alt={recent.name} />
            </figure>
            <div className="mt-4 space-y-2 font-poppins">
              <p className="text-lg font-medium">
                {recent.name.length > 20
                  ? `${recent.name.slice(0, 20)}...`
                  : recent.name}
              </p>

              {recent.category === "digital gift" ? (
                <p className="text-green-600 uppercase text-xs font-opensans">
                  In Stock
                </p>
              ) : recent.quantity > 0 ? (
                <p className="text-green-600 uppercase text-xs font-opensans">
                  In Stock
                </p>
              ) : (
                <p className="uppercase text-sm text-red-700 font-opensans">
                  Out of Stock
                </p>
              )}

              <p className="flex gap-2 items-center font-opensans">
                <Rating
                  style={{ maxWidth: 80 }}
                  value={averageRating}
                  readOnly
                />
                <span>{productReviews.length}</span>
              </p>

              {recent.category === "digital gift" ? (
                <div className="flex justify-start items-center gap-2 text-sm font-opensans">
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
                <p className="text-gray-700 font-opensans">
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
              {wishProduct ? (
                <button
                  onClick={() => handleRemove(wishProduct._id)}
                  className="bg-white shadow-xl p-2 rounded-full text-lg"
                >
                  <FaHeart className="text-primary" />
                </button>
              ) : (
                <button
                  onClick={() => handleAddTowish(recent)}
                  className="bg-white shadow-xl p-2 rounded-full text-lg"
                >
                  <FaRegHeart className="text-primary" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentView;
