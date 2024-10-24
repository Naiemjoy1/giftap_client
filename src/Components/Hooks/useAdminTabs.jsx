import {
  MdAddShoppingCart,
  MdDashboard,
  MdOutlinePayments,
  MdProductionQuantityLimits,
} from "react-icons/md";
import Dashboard from "../../Pages/Dashboard/Admin/Dashboard/Dashboard";
import SellerRequest from "../../Pages/Dashboard/Admin/SellerRequest/SellerRequest";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { PiUsersThree } from "react-icons/pi";
import Products from "../../Pages/Dashboard/Admin/Products/Products";
import AddProducts from "../../Pages/Dashboard/Admin/AddProducts/AddProducts";
import Users from "../../Pages/Dashboard/Admin/Users/Users";
import Promos from "../../Pages/Dashboard/Admin/Promos/Promos";
import { BiCommentError, BiSolidOffer } from "react-icons/bi";
import ManageAdvertise from "../../Pages/Dashboard/Admin/ManageAdvertise/ManageAdvertise";
import AddNotice from "../../Pages/Dashboard/Admin/AddNotice/AddNotice";
import { BsClipboard } from "react-icons/bs";
import Payments from "../../Pages/Dashboard/Admin/Payments/Payments";
import AllComplain from "../../Pages/Dashboard/Admin/AllComplain/AllComplain";

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
      page: <Products></Products>,
    },
    {
      name: "add product",
      icon: <MdAddShoppingCart />,
      tab: 3,
      page: <AddProducts></AddProducts>,
    },
    {
      name: "users",
      icon: <PiUsersThree />,
      tab: 4,
      page: <Users></Users>,
    },
    {
      name: "promos",
      icon: <BiSolidOffer />,
      tab: 5,
      page: <Promos></Promos>,
    },
  ];
  return [tabsData];
};

export default useAdminTabs;
