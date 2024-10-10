import { AiFillDelete } from "react-icons/ai";
import useWishs from "../../../../Components/Hooks/useWishs";
import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const WishList = () => {
  const [wishlists, refetchWish, isLoading] = useWishs();
  const [products, loading] = useProducts();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const myWishlist = wishlists?.filter((item) => item?.email === user?.email);
  const productIds = myWishlist?.map((item) => item?.productId);

  const wishlistProducts = products?.filter((product) =>
    productIds?.includes(product._id)
  );

  const handleRemove = async (wishlistId) => {
    try {
      const res = await axiosPublic.delete(`/wishlists/product/${wishlistId}`);
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
    <div className="overflow-x-auto  lg:flex justify-between space-y-4 gap-4">
      {/* Wishlist Section */}
      <div className="mb-8 lg:w-[60%] ">
        {wishlistProducts?.length === 0 ? (
          <div className="text-center my-4">
            <h3 className="text-lg font-semibold">Your wishlist is empty.</h3>
            <p>Add products to your wishlist to see them here!</p>
          </div>
        ) : (
          <table className="table">
            {/* Table Head */}
            <thead className="bg-primary text-white">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Store</th>
                <th>Details</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlistProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={product?.image?.cardImg1}
                            alt={product?.name}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product?.name}</td>
                  <td>{product?.category}</td>
                  <td>{product?.store_name}</td>
                  <td>
                    <Link to={`/shop/${product?._id}`}>
                      <button className="btn bg-secondary text-white btn-xs">
                        View Details
                      </button>
                    </Link>
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleRemove(product._id)}
                    >
                      <AiFillDelete className="text-primary text-xl" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Dummy Text Section */}
      <div className=" items-center p-4 border  rounded-md border-primary lg:w-[40%] ">
        <h2 className="flex justify-center items-center text-xl font-semibold mr-4">
          About Our Website
        </h2>
        <p className="items-center my-4">
          Welcome to <span className="text-primary">GiftTap</span>! Here you can
          explore a wide range of products tailored to meet your needs. Our
          wishlist feature allows you to save your favorite items for future
          reference. Add $50.00 to your cart and enjoy free shipping on your
          order! Plus, you can expect delivery within 3-4 days. We strive to
          provide an exceptional shopping experience and look forward to serving
          you. Happy shopping!
        </p>
      </div>
    </div>
  );
};

export default WishList;
