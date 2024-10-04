import { useState, useEffect } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import useAuth from "../../../Components/Hooks/useAuth";
import useCart from "../../../Components/Hooks/useCart";
import useUsers from "../../../Components/Hooks/useUsers";
import useProducts from "../../../Components/Hooks/useProducts";
import { RxCross2 } from "react-icons/rx";

const Cart = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [carts, refetch] = useCart();
  const [products] = useProducts();

  // Initialize quantities as an object
  const [quantities, setQuantities] = useState({});

  // This effect will set the quantities based on the user's cart items
  useEffect(() => {
    const initialQuantities = carts.reduce((acc, cart) => {
      acc[cart._id] = cart.quantity; // Set initial quantities from cart
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [carts]); // Re-run whenever carts change

  const [shippingOption, setShippingOption] = useState("flatRate");

  const userCarts = carts.filter((cart) => cart?.email === user?.email);

  const subtotal = userCarts.reduce((acc, cart) => {
    const quantity = quantities[cart._id] || cart.quantity; // Use quantities or default to cart quantity
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
    const updatedCarts = carts.filter((cart) => cart._id !== cartId);
    setQuantities((prevQuantities) => {
      const { [cartId]: removedItem, ...remainingQuantities } = prevQuantities;
      return remainingQuantities;
    });
    refetch();
  };

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-4">
        <div className="w-[65%] space-y-4">
          <div className="border p-4 rounded-lg">
            <p>Add $50.00 to cart and get free shipping</p>
            <progress
              className="progress progress-primary w-56"
              value="100"
              max="100"
            ></progress>
          </div>
          <div>
            <section className="flex">
              <section className="w-1/2">
                <p className="text-center">Product</p>
              </section>
              <section className="w-1/2 flex justify-between">
                <p className="w-[30%]">Price</p>
                <p className="w-[35%]">Quantity</p>
                <p className="w-[35%]">Subtotal</p>
              </section>
            </section>
            <div className="divider divider-primary"></div>
            {userCarts.map((cart) => (
              <div key={cart._id}>
                <section className="flex items-center">
                  <section className="w-1/2 flex items-center gap-6">
                    <div className="avatar">
                      <div className="w-10 rounded">
                        <img src={cart.image} alt={cart.name} />
                      </div>
                    </div>
                    <p className="text-center">
                      {cart.name.length > 20
                        ? cart.name.slice(0, 20) + "..."
                        : cart.name}
                    </p>
                  </section>
                  <section className="w-1/2 flex justify-between">
                    <p className="w-[20%]">${cart.price}</p>
                    <p className="w-[55%]">
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
                    </p>
                    <p className="w-[35%]">
                      $
                      {(
                        cart.price * (quantities[cart._id] || cart.quantity)
                      ).toFixed(2)}{" "}
                      {/* Fallback to cart quantity */}
                    </p>
                  </section>
                  <button onClick={() => handleRemove(cart._id)}>
                    <RxCross2></RxCross2>
                  </button>
                </section>
                <div className="divider divider-primary"></div>
              </div>
            ))}
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
            <button className="btn btn-primary text-white">Remove All</button>
          </div>
        </div>
        <div className="border w-[35%] rounded-lg p-4">
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
          <button className=" btn btn-primary text-center text-white">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
