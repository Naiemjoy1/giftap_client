import React from "react";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import useAdminstats from "../../../../Components/Hooks/useAdminstats";
import { RiFilePaper2Line, RiShoppingBasket2Line } from "react-icons/ri";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdOutlinePeopleAlt } from "react-icons/md";

const Dashboard = () => {
  const [admin] = useAdminstats();
  console.log(admin);

  return (
    <div>
      <section className="flex justify-between  gap-4">
        <div className="w-1/2 rounded-lg bg-white p-4">
          <p>left</p>
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4 justify-between items-center">
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Sales Today</p>
              <p className="p-2 bg-primary text-white rounded-md text-xl">
                <RiShoppingBasket2Line />
              </p>
            </div>
            <p className=" text-2xl">${admin.todayRevenue.toFixed(2)}</p>
            <p className=" text-xs">*Update every order success</p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Earning</p>
              <p className="p-2 bg-[#effef3] text-green-600 rounded-md text-xl">
                <HiOutlineCurrencyDollar />
              </p>
            </div>
            <p className=" text-2xl">${admin.totalRevenue.toFixed(2)}</p>
            <p className=" text-xs">
              {admin.revenueIncreasePercentage > 0 ? (
                <>
                  <span className=" text-green-600">
                    +{admin.revenueIncreasePercentage}%
                  </span>{" "}
                  sales increse
                </>
              ) : (
                <>
                  <span className=" text-red-600">
                    -{admin.revenueIncreasePercentage}%
                  </span>{" "}
                  sales decress
                </>
              )}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Orders</p>
              <p className="p-2 bg-[#f8f8f8] rounded-md text-xl">
                <RiFilePaper2Line />
              </p>
            </div>
            <p className=" text-2xl">{admin.totalSuccessfulPayments}</p>
            <p className=" text-xs">*Update every order success</p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Products</p>
              <p className="p-2 bg-primary bg-opacity-5 text-primary rounded-md text-xl">
                <MdOutlinePeopleAlt />
              </p>
            </div>
            <p className=" text-2xl">{admin.totalProducts}</p>
            <p className=" text-xs">
              Newly added {admin.totalNewlyAddedProducts} product
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
