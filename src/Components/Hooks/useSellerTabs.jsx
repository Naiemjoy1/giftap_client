import React from "react";
import Dashboard from "../../Pages/Dashboard/Seller/Dashboard/Dashboard";
import {
  MdAddShoppingCart,
  MdDashboard,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import Promotions from "../../Pages/Dashboard/Seller/Promotions/Promotions";
import AllProducts from "../../Pages/Dashboard/Seller/AllProducts/AllProducts";
import AddPro from "../../Pages/Dashboard/Seller/AddPro/AddPro";
import { RiAdvertisementFill } from "react-icons/ri";

import RequestBanner from "../../Pages/Dashboard/Seller/RequestBanner/RequestBanner";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";
import Orders from "../../Pages/Dashboard/Seller/Orders/Orders";

const useSellerTabs = () => {
  const tabsData = [
    {
      name: "dashboard",
      icon: <MdDashboard />,
      tab: 0,
      page: <Dashboard></Dashboard>,
    },
    {
      name: "products",
      icon: <MdProductionQuantityLimits />,
      tab: 1,
      page: <AllProducts></AllProducts>,
    },
    {
      name: "add product",
      icon: <MdAddShoppingCart />,
      tab: 2,
      page: <AddPro></AddPro>,
    },

    {
      name: "REquest Banner",
      icon: <RiAdvertisementFill />,
      tab: 3,
      page: <RequestBanner />,
    },
    // {
    //   name: "orders",
    //   icon: <BsCashStack />,
    //   tab: 4,
    //   page: <Orders></Orders>,
    // },
  ];
  return [tabsData];
};

export default useSellerTabs;
