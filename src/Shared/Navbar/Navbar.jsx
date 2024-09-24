import React from "react";
import Topbar from "./Topbar/Topbar";
import Offerbar from "./Offerbar/Offerbar";
import Searchbar from "./Searchbar/Searchbar";
import Navigation from "./Navigation/Navigation";

const Navbar = () => {
  return (
    <div className="shadow-md">
      <Offerbar></Offerbar>
      <Topbar></Topbar>
      <Searchbar></Searchbar>
      <Navigation></Navigation>
    </div>
  );
};

export default Navbar;
