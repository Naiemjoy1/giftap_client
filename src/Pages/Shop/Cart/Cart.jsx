import { useState, useEffect } from "react";
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

const Cart = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const [products] = useProducts();
  const axiosPublic = useAxiosPublic();

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = carts.reduce((acc, cart) => {
      acc[cart._id] = cart.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [carts]);

  const [shippingOption, setShippingOption] = useState("flatRate");

  const userCarts = carts.filter((cart) => cart?.email === user?.email);

  const subtotal = userCarts.reduce((acc, cart) => {
    const quantity = quantities[cart._id] || cart.quantity;
    return acc + cart.price * quantity;
  }, 0);

  const shippingCost = shippingOption === "flatRate" ? 5.0 : 0.0;
  const total = subtotal + shippingCost;

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
        axiosPublic.delete(`/carts/${cartId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting your item.",
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto my-10">
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
          <div className="lg:flex justify-between gap-4">
            <div className="lg:w-[65%] space-y-4">
              <div className="border p-4 rounded-lg">
                <p>Add $50.00 to cart and get free shipping</p>
                <progress
                  className="progress progress-primary w-56"
                  value="100"
                  max="100"
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
                              <RxCross2></RxCross2>
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
                                <div className="font-semibold">
                                  <p>
                                    {cart.name.length > 20
                                      ? cart.name.slice(0, 20) + "..."
                                      : cart.name}
                                  </p>
                                </div>
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
                          <th>
                            <button className="btn btn-ghost btn-xs">
                              $
                              {(
                                cart.price *
                                (quantities[cart._id] || cart.quantity)
                              ).toFixed(2)}
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-between">
                <section className="flex gap-2 w-6/12">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <button className="btn btn-primary text-white">
                    Apply coupon
                  </button>
                </section>
                <button className="btn btn-primary text-white">
                  Remove All
                </button>
              </div>
            </div>
            <div className="border lg:w-[35%] rounded-lg p-4">
              <p className="uppercase text-lg font-medium">cart totals</p>
              <div className="divider divider-primary"></div>
              <section className="flex justify-between items-center">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p> {/* Subtotal calculated */}
              </section>
              <div className="divider divider-primary"></div>
              <section className="flex justify-between items-center">
                <p>Shipping</p>
                <div>
                  <p className="flex justify-between items-center gap-4">
                    Flat rate: $5.00
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="flatRate"
                      checked={shippingOption === "flatRate"}
                      onChange={() => handleShippingChange("flatRate")}
                    />
                  </p>
                  <p className="flex justify-between items-center gap-4">
                    Local pickup
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="localPickup"
                      checked={shippingOption === "localPickup"}
                      onChange={() => handleShippingChange("localPickup")}
                    />
                  </p>
                </div>
              </section>
              <div className="divider divider-primary"></div>
              <section className="flex justify-between items-center">
                <p>Total</p>
                <p>${total.toFixed(2)}</p> {/* Total calculated */}
              </section>
              <div className="divider divider-primary"></div>
              <button className="btn btn-primary text-center text-white">
                Proceed to checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
