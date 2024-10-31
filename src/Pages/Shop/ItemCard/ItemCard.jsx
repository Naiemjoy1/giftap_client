import { Link } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useCart from "../../../Components/Hooks/useCart";
import toast from "react-hot-toast";
import useWishs from "../../../Components/Hooks/useWishs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ItemCard = ({ item }) => {
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
    store_name,
    quantity,
  } = item;

  const usersDetails = users.find((u) => u?.email === user?.email);
  const usersWishs = wishlists.filter((wish) => wish.email === user?.email);
  const wishProduct = usersWishs.find((item) => item.productId === _id);

  const truncatedName = name.length > 20 ? `${name.slice(0, 20)}...` : name;
  const truncatedDescription =
    description.length > 50 ? `${description.slice(0, 50)}...` : description;

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
    <div>
      <div className="group relative block overflow-hidden">
        {user ? (
          <>
            {wishProduct ? (
              <button
                onClick={() => handleRemove(wishProduct._id)}
                className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
              >
                <FaHeart className="text-primary" />
              </button>
            ) : (
              <button
                onClick={handleAddTowish}
                className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
              >
                <FaRegHeart className="text-primary" />
              </button>
            )}
          </>
        ) : (
          <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
            <FaRegHeart className="text-primary" />
          </button>
        )}

        <div className="aspect-square bg-gray-200">
          <img
            src={image.cardImg1}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="relative border border-gray-200 bg-white p-6 font-opensans">
          {category === "digital gift" ? (
            <p className="text-gray-700">
              {priceGroup.length}
              <span className="text-gray-400 ml-2">Price Variation</span>
            </p>
          ) : (
            <p className="text-gray-700">
              ${calculateDiscountedPrice(price).toFixed(2)}{" "}
              <span className="text-gray-400 line-through ml-2">
                ${price.toFixed(2)}
              </span>
            </p>
          )}
          <p className="text-sm text-gray-400 font-opensans">
            Store : <span className="text-black">{store_name}</span>
          </p>

          <h3 className="mt-1.5 text-lg font-medium text-gray-900 font-poppins">
            {truncatedName}
          </h3>

          <p className="mt-1.5 line-clamp-3 text-gray-700 font-opensans">
            {truncatedDescription}
          </p>

          <div className="mt-4 flex gap-4">
            {category === "digital gift" ? (
              <>
                {user ? (
                  <Link to={`/shop/${_id}`} className="flex-grow">
                    <button
                      onClick={handleRecent}
                      className="block w-full rounded bg-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 font-opensans"
                    >
                      See More
                    </button>
                  </Link>
                ) : (
                  <Link to={`/shop/${_id}`} className="flex-grow">
                    <button className="block w-full rounded bg-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 font-opensans">
                      See More
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <>
                {user ? (
                  <Link to={`/shop/${_id}`} className="flex-grow">
                    <button
                      onClick={handleRecent}
                      className="block w-full rounded bg-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 font-opensans"
                    >
                      See More
                    </button>
                  </Link>
                ) : (
                  <Link to={`/shop/${_id}`} className="flex-grow">
                    <button className="block w-full rounded bg-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 font-opensans">
                      See More
                    </button>
                  </Link>
                )}

                {user ? (
                  <>
                    {quantity > 0 ? (
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="flex-grow block rounded bg-primary px-4 py-3 text-sm font-medium text-white transition hover:scale-105 font-opensans"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex-grow block rounded bg-gray-400 px-4 py-3 text-sm font-medium text-white transition hover:scale-105 font-opensans"
                      >
                        Stock Out
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    className="flex-grow block rounded bg-primary px-4 py-3 text-sm font-medium text-white transition hover:scale-105 font-opensans"
                  >
                    Add to Cart
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
