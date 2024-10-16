import { Link } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useCart from "../../../Components/Hooks/useCart";
import toast from "react-hot-toast";
import useWishs from "../../../Components/Hooks/useWishs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ListItemCard = ({ item }) => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const [wishlists, refetchWish] = useWishs();
  const axiosPublic = useAxiosPublic();

  const {
    _id,
    name,
    image,
    price,
    description,
    category,
    priceGroup,
    discount,
  } = item;

  const usersDetails = users.find((u) => u?.email === user?.email);
  const usersWishs = wishlists.filter((wish) => wish.email === user?.email);
  const wishProduct = usersWishs.find((item) => item.productId === _id);

  const truncatedName = name.length > 20 ? `${name.slice(0, 20)}...` : name;
  const truncatedDescription =
    description.length > 50 ? `${description.slice(0, 150)}...` : description;

  const calculateDiscountedPrice = (amount) => {
    return discount ? amount * (1 - discount / 100) : amount;
  };

  const handleRecent = async () => {
    const recent = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: _id,
    };

    try {
      const res = await axiosPublic.post("/recentviews", recent);
      if (res.status === 200) {
        // console.log("Product added to recent view");
      } else {
        // console.log("Failed to add product to recent view");
      }
    } catch (error) {
      // console.error("Error adding product to recent view", error);
    }
  };

  const handleAddToCart = async () => {
    const discountedPrice = calculateDiscountedPrice(price).toFixed(2);
    let deliveryData;
    if (category === "digital gift") {
      deliveryData = selectedDelivery === "localPickup" ? date : "instant";
    } else {
      deliveryData = "home";
    }
    const purchase = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: _id,
      price: discountedPrice,
      quantity: 1,
      name: name,
      image: image.cardImg1,
      delivery: deliveryData,
      category: category,
    };
    try {
      const res = await axiosPublic.post("/carts", purchase);
      if (res.status === 200) {
        refetch();
        toast.success("Product added to cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  const handleAddTowish = async () => {
    if (wishProduct) {
      toast.error("Product is already in your wishlist");
      return;
    }

    const Wishlist = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: _id,
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

  return (
    <div className="flex border border-gray-200 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition duration-300">
      <img
        src={image.cardImg1}
        alt={name}
        className="h-40 w-40 object-cover rounded-l-lg"
      />

      <div className="flex-grow pl-4">
        <div className="flex justify-between items-start">
          {category === "digital gift" ? (
            <p className="text-gray-700 font-semibold">
              {priceGroup.length}
              <span className="text-gray-400 ml-2">Price Variation</span>
            </p>
          ) : (
            <p className="text-gray-700 font-semibold">
              ${calculateDiscountedPrice(price).toFixed(2)}{" "}
              <span className="text-gray-400 line-through ml-2 font-semibold">
                ${price.toFixed(2)} {/* Original price display */}
              </span>
            </p>
          )}
          {wishProduct ? (
            <button
              onClick={() => handleRemove(wishProduct._id)}
              className="rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
            >
              <FaHeart className="text-primary" />
            </button>
          ) : (
            <button
              onClick={handleAddTowish}
              className="rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
            >
              <FaRegHeart className="text-primary" />
            </button>
          )}
        </div>

        <h3 className="mt-2 text-lg font-medium text-gray-900">
          {truncatedName}
        </h3>

        <p className="mt-1 text-gray-700 line-clamp-3">
          {truncatedDescription}
        </p>

        <div className="mt-4 flex gap-4">
          {category === "digital gift" ? (
            <Link to={`/shop/${_id}`} className="flex-grow">
              <button
                onClick={handleRecent}
                className="block w-full rounded bg-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
              >
                See More
              </button>
            </Link>
          ) : (
            <>
              <Link to={`/shop/${_id}`} className="flex-grow">
                <button
                  onClick={handleRecent}
                  className="block w-full rounded bg-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                >
                  See More
                </button>
              </Link>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-grow block rounded bg-primary px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItemCard;
