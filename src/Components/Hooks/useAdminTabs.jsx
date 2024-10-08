import {
  MdAddShoppingCart,
  MdDashboard,
  MdProductionQuantityLimits,
} from "react-icons/md";
import Dashboard from "../../Pages/Dashboard/Admin/Dashboard/Dashboard";
import SellerRequest from "../../Pages/Dashboard/Admin/SellerRequest/SellerRequest";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { PiUsersThree } from "react-icons/pi";

const useAdminTabs = () => {
  const tabsData = [
    {
      name: "dashboard",
      icon: <MdDashboard />,
      tab: 0,
      page: <Dashboard></Dashboard>,
    },
    {
      name: "seller request",
      icon: <FaArrowsDownToPeople />,
      tab: 1,
      page: <SellerRequest></SellerRequest>,
    },
    {
      name: "products",
      icon: <MdProductionQuantityLimits />,
      tab: 2,
      page: <SellerRequest></SellerRequest>,
    },
    {
      name: "add product",
      icon: <MdAddShoppingCart />,
      tab: 3,
      page: <SellerRequest></SellerRequest>,
    },
    {
      name: "users",
      icon: <PiUsersThree />,
      tab: 4,
      page: <SellerRequest></SellerRequest>,
    },
  ];
  return [tabsData];
};

export default useAdminTabs;
