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
      tab: 2,
      page: <AllProducts></AllProducts>,
    },
    {
      name: "add product",
      icon: <MdAddShoppingCart />,
      tab: 3,
      page: <AddPro></AddPro>,
    },
    {
      name: "promos",
      icon: <BiSolidOffer />,
      tab: 5,
      page: <Promotions></Promotions>,
    },
  ];
  return [tabsData];
};

export default useSellerTabs;
