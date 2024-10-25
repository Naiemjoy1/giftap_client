import { useState } from "react";
import usePayment from "../../Components/Hooks/usePayment";
import useProducts from "../../Components/Hooks/useProducts";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useType from "../../Components/Hooks/useType";
import useAuth from "../../Components/Hooks/useAuth";

const TrackOrders = () => {
  const { user } = useAuth();
  const [track, setTrack] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payments, refetch] = usePayment();
  const [products] = useProducts();
  const axiosPublic = useAxiosPublic();

  const [userType] = useType();
  console.log(userType);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trackID = payments.find((payment) => payment.paymentId === track);
    setPaymentData(trackID);

    setLoading(false);
  };

  const handleCancel = async (productId) => {
    if (user.email !== paymentData.cus_email) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You are not authorized to cancel this order.",
      });
      return;
    }

    const productIndex = paymentData.productId.findIndex(
      (id) => id === productId
    );

    if (productIndex === -1) {
      console.error("Product not found in the payment data.");
      return;
    }

    const updatedDelivery = [...paymentData.delivery];
    updatedDelivery[productIndex] = "canceled";

    const changeData = {
      productId,
      deliveryStatus: "canceled",
    };

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (result.isConfirmed) {
        const response = await axiosPublic.patch("/payments", changeData);

        if (response.data?.success === true) {
          toast.success("Your item has been canceled successfully.");
          refetch();

          const updatedPaymentData = {
            ...paymentData,
            delivery: updatedDelivery,
          };
          setPaymentData(updatedPaymentData);
        } else {
          toast.error("Failed to cancel the item. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error updating delivery status:", error.message);
      toast.error("There was a problem canceling the delivery status.");

      Swal.fire(
        "Error!",
        "There was a problem canceling the delivery status.",
        "error"
      );
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
    <div
      className={`container mx-auto my-10 ${
        !paymentData ? "h-96 flex justify-center items-center" : ""
      }`}
    >
      <div>
        <div className="space-y-4">
          <p className="text-2xl font-bold text-center">
            Track Your Orders Here
          </p>
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Type payment ID here"
              className="input input-bordered w-full max-w-xs"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
            />
            <button
              onClick={handleTrack}
              className="btn btn-primary text-center text-white"
            >
              Submit
            </button>
          </div>
        </div>

        {paymentData ? (
          <div className="mt-4">
            <div className="flex justify-evenly">
              <h3 className="font-bold">Order Details:</h3>
              <p>
                <strong>Amount:</strong> ${paymentData.amount}
              </p>
              <p className="flex gap-2">
                <strong>Status:</strong>{" "}
                {paymentData.status === "success" ? (
                  <p className="text-green-600">Success</p>
                ) : (
                  <p className="text-warning">Pending</p>
                )}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(paymentData.date).toLocaleString()}
              </p>
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Detail</th>
                      <th>Store Details</th>
                      <th>Delivery Status</th>
                      <th>Cancel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentData.productId.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No products found in this order.
                        </td>
                      </tr>
                    ) : (
                      paymentData.productId.map((prodId, index) => {
                        const product = products.find(
                          (product) => product._id === prodId
                        );

                        return (
                          <tr key={index}>
                            {product ? (
                              <>
                                <th>{index + 1}</th>
                                <td>
                                  <div className="flex items-center gap-3">
                                    <div className="avatar">
                                      <div className="mask mask-squircle h-12 w-12">
                                        <img
                                          src={product.image.cardImg1}
                                          alt="Product"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-bold">
                                        {product.name}
                                      </div>
                                      <div className="text-sm opacity-50">
                                        {product.category
                                          .toLowerCase()
                                          .split(" ")
                                          .map(
                                            (word) =>
                                              word.charAt(0).toUpperCase() +
                                              word.slice(1)
                                          )
                                          .join(" ")}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className="font-bold">
                                    {product.store_name}
                                  </p>
                                  <p className="text-sm opacity-50">
                                    {product.seller_name}
                                  </p>
                                </td>
                                <td>
                                  {isNaN(
                                    Date.parse(paymentData.delivery[index])
                                  ) ? (
                                    paymentData.delivery[index]
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ") || "Status not available"
                                  ) : (
                                    <span>
                                      <strong>Date:</strong>{" "}
                                      {new Date(
                                        paymentData.delivery[index]
                                      ).toLocaleString()}
                                    </span>
                                  )}
                                </td>
                                <th>
                                  {paymentData?.delivery[
                                    index
                                  ].toLowerCase() === "delivered" ? (
                                    <button className="text-2xl text-green-600">
                                      <IoMdCheckmarkCircleOutline />
                                    </button>
                                  ) : (
                                    <>
                                      {paymentData?.delivery[
                                        index
                                      ].toLowerCase() === "canceled" ? (
                                        <button className="text-2xl text-red-600">
                                          <MdCancel />
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => handleCancel(prodId)}
                                          className="text-2xl text-warning"
                                        >
                                          <RxCross2 />
                                        </button>
                                      )}
                                    </>
                                  )}
                                  <p></p>
                                </th>
                              </>
                            ) : (
                              <td colSpan="4">
                                Product with ID {prodId} not found
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p>No data found. Please enter a valid payment ID.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
