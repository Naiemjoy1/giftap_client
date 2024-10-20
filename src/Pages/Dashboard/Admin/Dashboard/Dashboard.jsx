import React from "react";
import useAdminstats from "../../../../Components/Hooks/useAdminstats";
import { RiFilePaper2Line, RiShoppingBasket2Line } from "react-icons/ri";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import LineCharts from "./LineCharts/LineCharts";
import ShowPie from "./showPie/showPie";
import StockOut from "./StockOut/StockOut";

const Dashboard = () => {
  const [admin] = useAdminstats();

  return (
    <div className="space-y-4">
      <section className="flex justify-between gap-4">
        <div className="w-1/2 rounded-lg bg-white p-4 space-y-4">
          <div>
            <p className="text-sm text-primary">Revenue of this month</p>
            <p className=" space-x-1">
              <span className="font-bold text-2xl">
                ${admin.currentMonthRevenue?.toFixed(2)}
              </span>
              <span className="text-green-600 text-sm">
                (+{admin.revenueIncreasePercentage}%)
              </span>
            </p>
          </div>
          <LineCharts />
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4 justify-between items-center">
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Sales Today</p>
              <p className="p-2 bg-primary text-white rounded-md text-xl">
                <RiShoppingBasket2Line />
              </p>
            </div>
            <p className="text-2xl">${admin.todayRevenue?.toFixed(2) || 0}</p>
            <p className="text-xs">*Update every order success</p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Earning</p>
              <p className="p-2 bg-[#effef3] text-green-600 rounded-md text-xl">
                <HiOutlineCurrencyDollar />
              </p>
            </div>
            <p className="text-2xl">${admin.totalRevenue?.toFixed(2) || 0}</p>
            <p className="text-xs">
              {admin.revenueIncreasePercentage > 0 ? (
                <>
                  <span className="text-green-600">
                    +{admin.revenueIncreasePercentage}%
                  </span>{" "}
                  sales increase
                </>
              ) : (
                <>
                  <span className="text-red-600">
                    -{Math.abs(admin.revenueIncreasePercentage)}%
                  </span>{" "}
                  sales decrease
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
            <p className="text-2xl">{admin.totalSuccessfulPayments}</p>
            <p className="text-xs">
              {admin.successfulPaymentsIncreasePercentage > 0 ? (
                <>
                  <span className="text-green-600">
                    +{admin.successfulPaymentsIncreasePercentage}%
                  </span>{" "}
                  sales increase
                </>
              ) : (
                <>
                  <span className="text-red-600">
                    -{Math.abs(admin.successfulPaymentsIncreasePercentage)}%
                  </span>{" "}
                  sales decrease
                </>
              )}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Products</p>
              <p className="p-2 bg-primary bg-opacity-5 text-primary rounded-md text-xl">
                <MdOutlinePeopleAlt />
              </p>
            </div>
            <p className="text-2xl">{admin.totalProducts}</p>
            <p className="text-xs">
              Newly added {admin.totalNewlyAddedProducts} product
            </p>
          </div>
        </div>
      </section>
      <section className=" flex justify-center gap-4">
        <div className="w-1/2 rounded-lg bg-white p-4">
          <ShowPie admin={admin}></ShowPie>
        </div>
        <div className="w-1/2 rounded-lg bg-white p-4">
          <StockOut></StockOut>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
