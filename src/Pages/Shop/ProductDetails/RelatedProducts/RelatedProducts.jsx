import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useProducts from "../../../../Components/Hooks/useProducts";
import { Link } from "react-router-dom";
import useUsers from "../../../../Components/Hooks/useUsers";
import useAuth from "../../../../Components/Hooks/useAuth";
import useCart from "../../../../Components/Hooks/useCart";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useWishs from "../../../../Components/Hooks/useWishs";
import useReviews from "../../../../Components/Hooks/useReviews";

const RelatedProducts = ({ id }) => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const [products, loading] = useProducts();
  const [wishlists, refetchWish] = useWishs();
  const axiosPublic = useAxiosPublic();
  const [reviews] = useReviews();

  const product = products.find((p) => p._id === id);
  const related = products.filter(
    (p) => p.category === product.category && p._id !== id
  );

  const usersDetails = users.find((u) => u?.email === user?.email);
  const usersWishs = wishlists.filter((wish) => wish.email === user?.email);

  const calculateDiscountedPrice = (price, discount) => {
    return discount ? price * (1 - discount / 100) : price;
  };

  const handleAddToCart = async (item) => {
    const discountedPrice = calculateDiscountedPrice(
      item.price,
      item.discount
    ).toFixed(2);

    let deliveryData;
    if (item.category === "digital gift") {
      deliveryData = selectedDelivery === "localPickup" ? date : "instant";
    } else {
      deliveryData = "home";
    }

    const purchase = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: item._id,
      price: discountedPrice,
      quantity: 1,
      name: item.name,
      image: item.image.cardImg1,
      delivery: deliveryData,
      category: item.category,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {related.slice(0, 4).map((item) => {
        const wishProduct = usersWishs.find(
          (wish) => wish.productId === item._id
        );
        const productReviews = reviews.filter(
          (review) => review.productId === item._id
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
          <div className="relative group" key={item._id}>
            <figure>
              <img src={item.image.cardImg1} alt={item.name} />
            </figure>
            <div className="mt-4 space-y-2">
              <p className="text-lg font-medium font-poppins">
                {item.name.length > 20
                  ? `${item.name.slice(0, 20)}...`
                  : item.name}
              </p>

              {item.category === "digital gift" ? (
                <p className="text-green-600 uppercase text-xs font-opensans">
                  in stock
                </p>
              ) : item.quantity > 0 ? (
                <p className="text-green-600 uppercase text-xs font-opensans">
                  in stock
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
                <span>{productReviews?.length}</span>
              </p>

              {item.category === "digital gift" ? (
                <div className="flex justify-start items-center gap-2 text-sm">
                  {item.priceGroup.map((pkg, index) => (
                    <p
                      key={index}
                      className="bg-primary text-white px-2 rounded-full font-medium font-opensans"
                    >
                      {pkg.tier}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 font-opensans">
                  $
                  {calculateDiscountedPrice(item.price, item.discount).toFixed(
                    2
                  )}{" "}
                  {item.discount && (
                    <span className="text-gray-400 line-through ml-2">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </p>
              )}

              {item.category === "digital gift" ? (
                <Link
                  to={`/shop/${item._id}`}
                  className="btn btn-outline btn-primary w-full rounded-full font-opensans"
                >
                  See More
                </Link>
              ) : (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn btn-outline btn-primary w-full rounded-full font-opensans"
                >
                  Add to cart
                </button>
              )}
            </div>

            {item.discount && (
              <div className="absolute left-2 top-2">
                <p className="px-2 text-white bg-primary rounded-lg font-opensans">
                  {item.discount}%
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
                  onClick={() => handleAddTowish(item)}
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

export default RelatedProducts;
