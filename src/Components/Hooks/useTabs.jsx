import AddNotice from "../../Pages/Dashboard/Admin/AddNotice/AddNotice";
import AccountDetails from "../../Pages/Dashboard/User/AccountDetails/AccountDetails";
import Addresses from "../../Pages/Dashboard/User/Addresses/Addresses";
import Dashboard from "../../Pages/Dashboard/User/Dashboard/Dashboard";
import Downloads from "../../Pages/Dashboard/User/Downloads/Downloads";
import Orders from "../../Pages/Dashboard/User/Orders/Orders";
import WishList from "../../Pages/Dashboard/User/WishList/WishList";

const useTabs = () => {
  const tabsData = [
    { name: "dashboard", page: <Dashboard></Dashboard> },
    { name: "orders", page: <Orders></Orders> },
    { name: "downloads", page: <Downloads></Downloads> },
    { name: "addresses", page: <Addresses></Addresses> },
    { name: "account details", page: <AccountDetails></AccountDetails> },
    { name: "wishlist", page: <WishList></WishList> },
    { name: "Notice", page: <AddNotice></AddNotice> },
  ];
  return [tabsData];
};

export default useTabs;
