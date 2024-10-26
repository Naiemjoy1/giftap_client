import Topbar from "./Topbar/Topbar";
import Offerbar from "./Offerbar/Offerbar";
import Searchbar from "./Searchbar/Searchbar";
import Navigation from "./Navigation/Navigation";

const Navbar = () => {
  return (
    <div className="shadow-md">
      <div className="hidden lg:block">
        <Offerbar></Offerbar>
      </div>
      <div className="container max-w-screen-xl p-6 mx-auto">
        <div className="hidden lg:block">
          <Topbar></Topbar>
        </div>
        <Searchbar></Searchbar>
        <div className="hidden lg:block">
          <Navigation></Navigation>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
