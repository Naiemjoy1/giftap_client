import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import useRecentView from "../../../Components/Hooks/useRecntView";
import { Link } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";
import useCart from "../../../Components/Hooks/useCart";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const RecentView = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const axiosPublic = useAxiosPublic();
  const [recentviews] = useRecentView();

  const usersDetails = users.find((u) => u?.email === user?.email);

  const calculateDiscountedPrice = (price, discount) => {
    return discount ? price * (1 - discount / 100) : price;
  };

  const handleAddToCart = async (recent) => {
    const discountedPrice = calculateDiscountedPrice(
      recent.price,
      recent.discount
    ).toFixed(2);
    const purchase = {
      userID: usersDetails?._id,
      email: user?.email,
      productId: recent.productId,
      price: discountedPrice,
      quantity: 1,
      name: recent.name,
      image: recent.image.itemImg1,
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

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
      {recentviews.slice(0, 4).map((recent) => (
        <div className="relative group" key={recent.productId}>
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
              <p className="text-green-600 uppercase text-xs">in stock</p>
            ) : recent.quantity > 0 ? (
              <p className="text-green-600 uppercase text-xs">in stock</p>
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
                to={`/shop/${recent.productId}`}
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
            <button className="bg-white shadow-xl p-2 rounded-full text-lg">
              <FaRegHeart />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentView;
