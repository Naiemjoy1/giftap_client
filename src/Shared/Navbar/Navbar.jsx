import Topbar from "./Topbar/Topbar";
import Offerbar from "./Offerbar/Offerbar";
import Searchbar from "./Searchbar/Searchbar";
import Navigation from "./Navigation/Navigation";
import useAuth from "../../Components/Hooks/useAuth";

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  return (
    <div className="shadow-md">
      <div className="hidden lg:block">
        <Offerbar></Offerbar>
      </div>
      <div className="hidden lg:block">
        <Topbar></Topbar>
      </div>
      <Searchbar></Searchbar>
      <div className="hidden lg:block">
        <Navigation></Navigation>
      </div>
    </div>
  );
};

export default Navbar;
