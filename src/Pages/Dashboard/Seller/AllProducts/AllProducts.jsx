import { useState } from "react";
import useProducts from "../../../../Components/Hooks/useProducts";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import EditProduct from "../../Admin/EditProduct/EditProduct";
import useAuth from "../../../../Components/Hooks/useAuth";
import useUsers from "../../../../Components/Hooks/useUsers";

const AllProducts = () => {
  const [products, loading, refetch] = useProducts();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [users] = useUsers();

  const useDetails = users.find((userId) => userId.email === user.email);

  const userProducts = products.filter(
    (product) => product.userId === useDetails._id
  );

  const [editProductId, setEditProductId] = useState(null);

  const handleRemove = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/products/${productId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              toast.success("Product has been deleted.");
            } else {
              toast.error("There was an issue deleting the product.");
            }
          })
          .catch((error) => {
            toast.error("An error occurred while deleting the product.");
            console.error(error);
          });
      }
    });
  };

  const handleEditClick = (productId) => {
    setEditProductId(productId);
  };

  const handleBackClick = () => {
    setEditProductId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {editProductId ? (
        <div>
          <EditProduct
            productId={editProductId}
            handleBackClick={handleBackClick}
          />{" "}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="overflow-y-auto max-h-[600px]">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Details</th>
                  <th>Seller Details</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userProducts?.map((product) => (
                  <tr key={product._id}>
                    <th>
                      <button
                        className="text-xl font-bold text-primary"
                        onClick={() => handleRemove(product._id)}
                      >
                        <RxCross2 />
                      </button>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={product.image.cardImg1} alt="Product" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                          <div className="text-sm opacity-50">
                            {product.category
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="font-semibold">{product.store_name}</p>
                      <p>{product.seller_name}</p>
                    </td>
                    <td className="text-xs">
                      {product.category === "digital gift" ? (
                        <>
                          {product.priceGroup.map((pg) => (
                            <p key={pg.tier}>
                              {pg.tier} :
                              <span
                                className={
                                  pg.quantity < 20 ? "text-red-600" : ""
                                }
                              >
                                {pg.quantity}
                              </span>
                            </p>
                          ))}
                        </>
                      ) : (
                        <span
                          className={
                            product.quantity < 20 ? "text-red-600" : ""
                          }
                        >
                          {product.quantity}
                        </span>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleEditClick(product._id)}
                        className="text-xl text-red-600"
                      >
                        <FaEdit />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
