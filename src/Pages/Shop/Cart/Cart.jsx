import { useState, useEffect, useRef } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import useAuth from "../../../Components/Hooks/useAuth";
import useCart from "../../../Components/Hooks/useCart";
import useUsers from "../../../Components/Hooks/useUsers";
import useProducts from "../../../Components/Hooks/useProducts";
import { RxCross2 } from "react-icons/rx";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import usePromo from "../../../Components/Hooks/usePromo";
import ConfirmPay from "./ConfirmPay/ConfirmPay";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import ScrollNav from "../../../Shared/Navbar/ScrollNav/ScrollNav";

const Cart = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const [products, loading] = useProducts();
  const axiosSecure = useAxiosSecure();
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [currentCartId, setCurrentCartId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payment, setPayment] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDelivery, setSelectedDelivery] = useState("localPickup");
  const [shippingOption, setShippingOption] = useState("flatRate");
  const [coupon, setCoupon] = useState();
  const [promo] = usePromo();
  const [applyPromo, setApplyPromo] = useState("");

  const navbarRef = useRef(null);
  const [showScrollNav, setShowScrollNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
        setShowScrollNav(window.scrollY > navbarBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initialQuantities = carts.reduce((acc, cart) => {
      acc[cart._id] = cart.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [carts]);

  const usersDetails = users.find((u) => u?.email === user?.email);

  const userCarts = carts.filter((cart) => cart?.email === user?.email);

  const subtotal = userCarts.reduce((acc, cart) => {
    const quantity = quantities[cart._id] || cart.quantity;
    return acc + cart.price * quantity;
  }, 0);

  const shippingCost = shippingOption === "flatRate" ? 5.0 : 0.0;
  const total = subtotal + shippingCost;

  const discountValue = applyPromo?.discount?.includes("%")
    ? (parseFloat(applyPromo.discount) / 100) * total
    : parseFloat(applyPromo.discount) || 0;

  const coupontotal = total - discountValue;

  const progressValue = (subtotal / 50) * 100;

  useEffect(() => {
    if (progressValue >= 100) {
      setShippingOption("freeShipping");
    } else {
      if (subtotal < 50) {
        setShippingOption("flatRate");
      }
    }
  }, [progressValue, subtotal]);

  const handleIncrease = (cartId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartId]: prevQuantities[cartId] + 1,
    }));
  };

  const handleDecrease = (cartId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartId]: prevQuantities[cartId] > 1 ? prevQuantities[cartId] - 1 : 1,
    }));
  };

  const handleShippingChange = (option) => {
    setShippingOption(option);
  };

  const handleCoupon = (e) => {
    e.preventDefault();

    const matchedPromo = promo.find(
      (p) => p.promoCode === coupon && p.status === "active"
    );

    if (!matchedPromo) {
      toast.error("Invalid or expired coupon code");
      setApplyPromo("");
      return;
    } else {
      const promoData = {
        discount: matchedPromo.discount,
      };
      toast.success("Coupon Applied");
      setApplyPromo(promoData);
    }
  };

  const handleRemove = (cartId) => {
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
        axiosSecure.delete(`/carts/${cartId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Your item has been deleted.");
          } else {
            toast.error("There was an issue deleting your item.");
          }
        });
      }
    });
  };

  const handleOpenMessageModal = (cartId, currentMessage) => {
    setCurrentCartId(cartId);
    setMessage(currentMessage || "");
    document.getElementById("message").showModal();
  };

  const handleAddMessage = () => {
    const deliveryData = selectedDelivery === "localPickup" ? date : "instant";

    const update = {
      id: currentCartId,
      message: message,
      delivery: deliveryData,
    };

    axiosSecure.patch(`/carts/${currentCartId}`, update).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        setMessage("");
        setCurrentCartId(null);
        document.getElementById("message").close();
        toast.success("Message and delivery updated successfully!");
      } else {
        toast.error("Failed to update message and delivery.");
      }
    });
  };

  const handleCheckout = () => {
    const shippingEmail = usersDetails?.address?.shipping[0].email;

    const paymentData = {
      email: user.email,
      total: coupontotal.toFixed(2),
      cartIds: userCarts.map((cart) => cart._id),
      productId: userCarts.map((cart) => cart.productId),
      user: usersDetails,
      amount: coupontotal.toFixed(2),
      currency: "USD",
      name: user.displayName,
      date: new Date(),
      message: userCarts.map((cart) => cart.message),
      category: userCarts.map((cart) => cart.category),
      delivery: userCarts.map((cart) => cart.delivery),
      shippingEmail: shippingEmail,
      quantities: userCarts.map(
        (cart) => quantities[cart._id] || cart.quantity
      ),
      tier: userCarts.map((cart) => cart.tier),
    };

    setPayment(paymentData);
    setIsModalVisible(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4 lg:px-0 font-opensans">
      <div ref={navbarRef}></div>
      {showScrollNav && (
        <div className="fixed top-0 left-0 w-full z-50">
          <ScrollNav />
        </div>
      )}
      {userCarts.length === 0 ? (
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center w-24 h-24 rounded-full border-2 border-primary bg-white">
              <p className="text-center text-4xl text-primary">
                <PiShoppingBagOpenFill />
              </p>
            </div>
            <p className="text-center text-xl uppercase text-primary font-semibold mt-4">
              Your cart is currently empty.
            </p>
            <Link
              to="/shop"
              className="btn btn-primary rounded-full text-white"
            >
              Return to shop
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="lg:flex justify-between space-y-4 gap-4">
            <div className="lg:w-[65%] space-y-4">
              <div className="border p-4 rounded-lg w-full">
                <p>Add $50.00 to cart and get free shipping</p>
                <progress
                  className="progress progress-primary w-full"
                  value={progressValue}
                  max="100" // Setting max to 100 since we're showing percentage
                ></progress>
              </div>
              <div>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userCarts.map((cart) => (
                        <tr key={cart._id}>
                          <th>
                            <button onClick={() => handleRemove(cart._id)}>
                              <RxCross2 />
                            </button>
                          </th>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img src={cart.image} alt={cart.name} />
                                </div>
                              </div>
                              <div>
                                <div>
                                  <p className="font-semibold">
                                    {cart.name.length > 20
                                      ? cart.name.slice(0, 20) + "..."
                                      : cart.name}
                                  </p>
                                  <section className="flex items-center gap-1">
                                    {cart.category === "digital gift" ? (
                                      <p className="text-xs">
                                        {cart.message === "" ? (
                                          <button
                                            className="text-primary text-xs"
                                            onClick={() =>
                                              handleOpenMessageModal(
                                                cart._id,
                                                cart.message
                                              )
                                            }
                                          >
                                            Add Message
                                          </button>
                                        ) : (
                                          <>
                                            {cart.message ? (
                                              <>
                                                {cart.message?.length > 20
                                                  ? cart.message?.slice(0, 12)
                                                  : cart.message}
                                                <button
                                                  className="text-primary text-xs"
                                                  onClick={() =>
                                                    handleOpenMessageModal(
                                                      cart._id,
                                                      cart.message
                                                    )
                                                  }
                                                >
                                                  ...edit
                                                </button>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        )}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </section>
                                </div>

                                <dialog id="message" className="modal">
                                  <div className="modal-box relative p-6 bg-white rounded-lg shadow-lg">
                                    <form
                                      method="dialog"
                                      className="absolute right-4 top-4"
                                    >
                                      <button className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200">
                                        ✕
                                      </button>
                                    </form>
                                    <h3 className="font-bold text-xl text-center mb-4">
                                      Add Your Message
                                    </h3>
                                    <textarea
                                      className="textarea textarea-bordered w-full h-24 p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                      placeholder="Enter your message here..."
                                      value={message}
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                    ></textarea>
                                    <div className="mt-4 flex justify-between items-center">
                                      <div className="flex justify-between items-center gap-2">
                                        <input
                                          type="radio"
                                          className="size-4 rounded border-gray-300"
                                          id="localPickup"
                                          name="deliveryOption"
                                          checked={
                                            selectedDelivery === "localPickup"
                                          }
                                          onChange={() =>
                                            setSelectedDelivery("localPickup")
                                          }
                                        />
                                        <Flatpickr
                                          data-enable-time
                                          value={date}
                                          onChange={([date]) => setDate(date)}
                                          options={{
                                            minDate: "today", // Allow only future dates
                                            static: true,
                                          }}
                                          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                      </div>
                                      <div className="flex justify-end items-center gap-2">
                                        <input
                                          type="radio"
                                          className="size-4 rounded border-gray-300"
                                          id="instantDelivery"
                                          name="deliveryOption"
                                          checked={
                                            selectedDelivery ===
                                            "instantDelivery"
                                          }
                                          onChange={() =>
                                            setSelectedDelivery(
                                              "instantDelivery"
                                            )
                                          }
                                        />
                                        <p>Instant Delivery</p>
                                      </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddMessage(cart._id)
                                        }
                                        className="btn btn-primary text-white px-6 py-2 rounded-lg hover:bg-primary-focus transition-all duration-300"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </dialog>
                              </div>
                            </div>
                          </td>
                          <td>${cart.price}</td>
                          <td>
                            <section className="flex gap-2 items-center justify-center">
                              <button
                                className="bg-gray-200 p-2 rounded-full text-xs"
                                onClick={() => handleDecrease(cart._id)}
                              >
                                <FiMinus />
                              </button>
                              <p>{quantities[cart._id] || cart.quantity}</p>{" "}
                              {/* Fallback to cart quantity */}
                              <button
                                className="bg-gray-200 p-2 rounded-full text-xs"
                                onClick={() => handleIncrease(cart._id)}
                              >
                                <FiPlus />
                              </button>
                            </section>
                          </td>
                          <td>
                            $
                            {(
                              (quantities[cart._id] || cart.quantity) *
                              cart.price
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className=" flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Add coupon here"
                  className="input input-bordered w-full max-w-xs"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  onClick={handleCoupon}
                  className="btn btn-primary text-white"
                >
                  Apply coupon
                </button>
              </div>
            </div>
            <div className="border lg:w-[35%] rounded-lg p-4">
              <p className="uppercase text-lg font-medium">cart totals</p>
              <div className="border-b my-2"></div>
              <section className="flex justify-between items-center">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p> {/* Subtotal calculated */}
              </section>
              <div className="border-b my-2"></div>
              <section className="flex justify-between items-center">
                <p>Shipping</p>
                <div>
                  <p className="flex justify-between mt-2 items-center">
                    <span>Flat</span>
                    <span>
                      {shippingOption === "freeShipping"
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                    <input
                      type="radio"
                      className="size-4 rounded border-gray-300"
                      id="flatRate"
                      checked={shippingOption === "flatRate"}
                      onChange={() => handleShippingChange("flatRate")}
                    />
                  </p>
                  <div className="border-b my-2"></div>
                  <p className="flex justify-between items-center gap-4">
                    Local pickup
                    <input
                      type="radio"
                      className="size-4 rounded border-gray-300"
                      id="localPickup"
                      checked={shippingOption === "localPickup"}
                      onChange={() => handleShippingChange("localPickup")}
                    />
                  </p>
                </div>
              </section>
              <div className="border-b my-2"></div>
              <section className="flex justify-between items-center">
                <p>Coupon</p>
                {applyPromo.discount ? <p>{applyPromo.discount}</p> : "$0.00"}
              </section>
              <div className="border-b my-2"></div>
              <section className="flex justify-between items-center">
                <p>Total</p>
                <p>${coupontotal.toFixed(2)}</p>
              </section>
              <div className="border-b my-2"></div>
              <button
                onClick={handleCheckout}
                className="btn btn-primary text-center text-white"
              >
                Proceed to checkout
              </button>
            </div>
            {isModalVisible && (
              <dialog id="confirm" open className="modal">
                <div className="modal-box relative p-6 bg-white rounded-lg shadow-lg">
                  <h3 className="font-bold text-xl text-center mb-4">
                    Confirm Checkout
                  </h3>
                  <p>Are you sure you want to proceed with the payment?</p>
                  {usersDetails.name ? (
                    <ConfirmPay
                      payment={payment}
                      setIsModalVisible={setIsModalVisible}
                    ></ConfirmPay>
                  ) : (
                    <div>
                      <p className="text-center">
                        Please update your profile{" "}
                        <span className="font-semibold text-primary">
                          <a href="/profile">here</a>
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </dialog>
            )}
          </div>
          <div className="mt-4">
            <img
              src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
