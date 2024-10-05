import React from "react";
import Billing from "./Billing/Billing";
import Shipping from "./Shipping/Shipping";
import useAuth from "../../../../Components/Hooks/useAuth";
import useUsers from "../../../../Components/Hooks/useUsers";
import { FaRegEdit } from "react-icons/fa";

const Addresses = () => {
  const { user } = useAuth();
  const [users, refetch] = useUsers();

  const usersDetails = users.find((u) => u?.email === user?.email);

  const billingInfo = usersDetails?.address?.billing[0];
  const shippingInfo = usersDetails?.address?.shipping[0];

  return (
    <div className="space-y-4">
      <p>
        The Following addresses will be used on the checkout page by default
      </p>
      <div className="flex justify-between gap-10">
        <section className="w-1/2">
          <p className="font-bold">Billing Address</p>

          {billingInfo ? (
            <div className="border p-4 rounded-xl border-primary relative mt-2">
              <p>
                <span className="font-semibold">Name: </span>
                {`${billingInfo.firstName} ${billingInfo.lastName}`}
              </p>
              <p>
                <span className="font-semibold">Address: </span>
                {billingInfo.streetAddress}
              </p>
              <p>
                <span className="font-semibold">Zip Code: </span>
                {billingInfo.zipCode}
              </p>
              <p>
                <span className="font-semibold">Region: </span>
                {billingInfo.district}, {billingInfo.division}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {billingInfo.isdCode} {billingInfo.phone}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {billingInfo.email}
              </p>
              <button
                onClick={() => document.getElementById("billing").showModal()}
                className="absolute top-3 right-4 text-primary"
              >
                <FaRegEdit />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => document.getElementById("billing").showModal()}
                className="text-primary hover:underline"
              >
                Add Billing Address
              </button>
              <p className="font-semibold">No billing address added.</p>
            </>
          )}

          <dialog id="billing" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-semibold uppercase">Billing Address</h3>
              <div className="divider"></div>
              <Billing
                onClose={() => document.getElementById("billing").close()}
              />
            </div>
          </dialog>
        </section>
        <section className="w-1/2">
          <p className="font-bold">Shipping Address</p>
          {shippingInfo ? (
            <div className="border p-4 rounded-xl border-primary relative mt-2">
              <p>
                <span className="font-semibold">Name: </span>
                {`${shippingInfo.firstName} ${shippingInfo.lastName}`}
              </p>
              <p>
                <span className="font-semibold">Address: </span>
                {shippingInfo.streetAddress}
              </p>
              <p>
                <span className="font-semibold">Zip Code: </span>
                {shippingInfo.zipCode}
              </p>
              <p>
                <span className="font-semibold">Region: </span>
                {shippingInfo.district}, {shippingInfo.division}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {shippingInfo.isdCode} {shippingInfo.phone}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {shippingInfo.email}
              </p>
              <button
                onClick={() => document.getElementById("shipping").showModal()}
                className="absolute top-3 right-4 text-primary"
              >
                <FaRegEdit />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => document.getElementById("shipping").showModal()}
                className="text-primary hover:underline"
              >
                Add Shipping Address
              </button>
              <p className="font-semibold">No shipping address added.</p>
            </>
          )}

          <dialog id="shipping" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-semibold uppercase">Shipping Address</h3>
              <div className="divider"></div>
              <Shipping
                onClose={() => document.getElementById("shipping").close()}
              />
            </div>
          </dialog>
        </section>
      </div>
    </div>
  );
};

export default Addresses;
