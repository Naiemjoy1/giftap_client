import Navbar1 from "./Navbar1";
import Navbar2 from "./Navbar2";
import Navbar3 from "./Navbar3";

const Navbar = () => {
  return (
    <div>
      <Navbar1 />
      <div className="border border-gray-100 my-1 hidden md:block lg:block"></div>
      <Navbar2 />
      <div className="border-b-4 border-dotted border-gray-200 my-2 hidden md:block lg:block"></div>
      <div className="border border-gray-100 my-1 md:hidden block "></div>
      <Navbar3  />
      <div className="border-b-4 border-dotted border-gray-200 my-2 hidden md:block lg:block"></div>
      <div className="border border-gray-100 my-1 md:hidden block "></div>
    </div>
  );
};

export default Navbar;
