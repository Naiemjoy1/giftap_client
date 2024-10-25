import { RiFilePaper2Line, RiShoppingBasket2Line } from "react-icons/ri";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import LineCharts from "./LineCharts/LineCharts";
import ShowPie from "./showPie/showPie";
import StockOut from "./StockOut/StockOut";
import useSellerStat from "../../../../Components/Hooks/useSellerStat";
import useAuth from "../../../../Components/Hooks/useAuth";
import useSellers from "../../../../Components/Hooks/useSellers";

const Dashboard = () => {
  const { user } = useAuth();
  const [sellers] = useSellers();

  const currentSeller = sellers.find((seller) => seller.email === user.email);

  const [sellerStat] = useSellerStat();

  const currentSellerStat =
    currentSeller && sellerStat[currentSeller.shopName]
      ? sellerStat[currentSeller.shopName]
      : null;

  return (
    <div className="space-y-4">
      <section className="lg:flex justify-between gap-4">
        <div className="lg:w-1/2 rounded-lg bg-white p-4 space-y-4">
          <div>
            <p className="text-sm text-primary">Revenue of this month</p>
            <p className=" space-x-1">
              <span className="font-bold text-2xl">
                $
                {currentSellerStat?.currentMonthTotal
                  ? currentSellerStat.currentMonthTotal.toFixed(2)
                  : 0}
              </span>
              <span className="text-green-600 text-sm">
                (+
                {currentSellerStat?.monthlyIncreasePercentage
                  ? currentSellerStat.monthlyIncreasePercentage
                  : 0}
                %)
              </span>
            </p>
          </div>
          <div>
            <LineCharts currentSellerStat={currentSellerStat} />
          </div>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4 justify-between">
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Sales Today</p>
              <p className="p-2 bg-primary text-white rounded-md text-xl">
                <RiShoppingBasket2Line />
              </p>
            </div>
            <p className="text-2xl">
              $
              {currentSellerStat?.todayTotal
                ? currentSellerStat.todayTotal.toFixed(2)
                : 0}
            </p>
            <p className="text-xs">*Update every order success</p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Earning</p>
              <p className="p-2 bg-green-600 bg-opacity-10 text-green-600 rounded-md text-xl">
                <HiOutlineCurrencyDollar />
              </p>
            </div>
            <p className="text-2xl">
              $
              {currentSellerStat?.grandTotal
                ? currentSellerStat.grandTotal.toFixed(2)
                : 0}
            </p>
            <p className="text-xs">
              {currentSellerStat?.grandTotal > 0 ? (
                <>
                  <span className="text-green-600">
                    +{currentSellerStat?.yearlyIncreasePercentage}%
                  </span>{" "}
                  sales increase
                </>
              ) : (
                <>
                  <span className="text-red-600">
                    -{Math.abs(currentSellerStat?.yearlyIncreasePercentage)}%
                  </span>{" "}
                  sales decrease
                </>
              )}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Orders</p>
              <p className="p-2 bg-green-600 bg-opacity-10 text-green-600 rounded-md text-xl">
                <RiFilePaper2Line />
              </p>
            </div>
            <p className="text-2xl">
              {currentSellerStat?.grandCount ? currentSellerStat.grandCount : 0}
            </p>
            <p className="text-xs">
              {currentSellerStat?.yearlyCountIncreasePercentage > 0 ? (
                <>
                  <span className="text-green-600">
                    +{currentSellerStat?.yearlyCountIncreasePercentage}%
                  </span>{" "}
                  sales increase
                </>
              ) : (
                <>
                  <span className="text-red-600">
                    -
                    {Math.abs(currentSellerStat?.yearlyCountIncreasePercentage)}
                    %
                  </span>{" "}
                  sales decrease
                </>
              )}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Total Products</p>
              <p className="p-2 bg-primary bg-opacity-10 text-primary rounded-md text-xl">
                <MdOutlinePeopleAlt />
              </p>
            </div>
            <p className="text-2xl">{currentSellerStat?.totalProducts}</p>
            <p className="text-xs">
              Newly added {currentSellerStat?.newProductsCount} product
            </p>
          </div>
        </div>
      </section>
      <section className=" lg:flex md:flex justify-center gap-4">
        <div className="lg:w-1/3 md:w-1/2 rounded-lg bg-white p-4 flex justify-center items-center">
          <ShowPie currentSellerStat={currentSellerStat}></ShowPie>
        </div>
        <div className="lg:w-2/3 md:w-1/2 rounded-lg bg-white p-4">
          <StockOut></StockOut>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
