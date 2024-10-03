import React from "react";
import { useLocation } from "react-router-dom";
import useProducts from "../../../Components/Hooks/useProducts";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";

const Purchase = () => {
  const location = useLocation();
  const { purchase } = location.state || {};

  const [products] = useProducts();

  const product = products.find((p) => p._id === purchase?.productId);
  console.log(product);
  const { category, image } = product ?? {};

  const Package = product?.priceGroup?.find(
    (pkg) => pkg.tier === purchase?.tier
  );
  console.log("Selected Package: ", Package);

  const { user } = useAuth();
  const [users, refetch] = useUsers();

  const usersDetails = users.find((u) => u?.email === user?.email);
  console.log(usersDetails);

  //   const { _id, email } = usersDetails ?? {};
  //   {category === "digital gift" ? (
  //     <img src={Package?.image} alt="" />
  //   ) : (
  //     <img src={image?.itemImg} alt="" />
  //   )}

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-4">
        <div className=" w-[65%] space-y-4">
          <section className=" border p-4 rounded-lg">
            <p>Add $50.00 to cart and get free shipping</p>
            <progress
              className="progress progress-primary w-56"
              value="10"
              max="100"
            ></progress>
          </section>
          <section>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
          <section className="flex justify-between">
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
          </section>
        </div>
        <div className="border w-[35%] rounded-lg p-4">
          <p className=" uppercase text-lg font-medium">cart totals</p>
          <div className="divider"></div>
          <section className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>$0.00</p>
          </section>
          <div className="divider"></div>
          <section className="flex justify-between items-center">
            <p>Shipping</p>
            <div>
              <p className="flex justify-between items-center gap-4">
                Flat rate: $5.00
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300"
                  id="Option2"
                />
              </p>
              <p className="flex justify-between items-center gap-4">
                Local pickup
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300"
                  id="Option2"
                />
              </p>
            </div>
          </section>
          <div className="divider"></div>
          <section className="flex justify-between items-center">
            <p>Total</p>
            <p>$7.25</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
