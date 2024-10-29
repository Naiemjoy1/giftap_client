import Offerbar from "./Offerbar/Offerbar";
import Searchbar from "./Searchbar/Searchbar";
import Navigation from "./Navigation/Navigation";

const Navbar = () => {
  return (
    <div className="shadow-md">
      <div className="hidden lg:block">
        <Offerbar />
      </div>
      <div>
        <Searchbar />
        <div className="hidden lg:block">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
