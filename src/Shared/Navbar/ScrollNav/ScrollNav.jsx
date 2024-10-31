import React from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useType from "../../../Components/Hooks/useType";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminChat from "../../../Pages/Support/AdminChat/AdminChat";
import { FaBars } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useCart from "../../../Components/Hooks/useCart";
import { Drawer } from "@material-tailwind/react";
import NavDrawer from "../Drawer/NavDrawer";

const ScrollNav = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const [userType, isLoading] = useType();

  const location = useLocation();

  const navLinks = (
    <>
      <li>
        <a
          href="/"
          className={`px-4 py-2 rounded-md text-sm ${
            location.pathname === "/"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/shop"
          className={`px-4 py-2 rounded-md text-sm ${
            location.pathname === "/shop"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Shop
        </a>
      </li>
      <li>
        <a
          href="/blog"
          className={`px-4 py-2 rounded-md text-sm ${
            location.pathname === "/blog"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Blog
        </a>
      </li>
      <li>
        <a
          href="/contact"
          className={`px-4 py-2 rounded-md text-sm ${
            location.pathname === "/contact"
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }`}
        >
          Contact
        </a>
      </li>
      {userType === "admin" && (
        <li>
          <a
            href="/dashboard"
            className={`px-4 py-2 rounded-md text-sm ${
              location.pathname === "/dashboard"
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            Dashboard
          </a>
        </li>
      )}
      {userType === "seller" && (
        <li>
          <a
            href="/sellerdashboard"
            className={`px-4 py-2 rounded-md text-sm ${
              location.pathname === "/sellerdashboard"
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            Dashboard
          </a>
        </li>
      )}
    </>
  );

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [carts = []] = useCart();

  const userCarts = carts?.filter((cart) => cart?.email === user?.email) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl py-2">
      <div className="flex justify-between items-center px-4 lg:hidden">
        <div>
          <button onClick={toggleDrawer}>
            <FaBars />
          </button>
        </div>
        <div>
          <Link to="/">
            <p className="text-2xl md:text-4xl font-extrabold font-poppins">
              Giftap
            </p>
          </Link>
        </div>
        <div>
          <section className="flex justify-center items-center gap-2">
            <section>
              <p className="font-semibold">$0.00</p>
            </section>

            <section className="flex justify-between items-baseline gap-4">
              <Link to="/cart" className="relative">
                <p className="text-2xl">
                  <HiOutlineShoppingBag />
                </p>
                <div className="bg-primary absolute top-0 -right-1 transform translate-x-1 -translate-y-1 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                  {userCarts.length || 0}
                </div>
              </Link>
              {user && <AdminChat />}
            </section>
          </section>
        </div>
      </div>
      <div className="lg:flex justify-between items-center container mx-auto hidden">
        <section>
          <div>
            <Link to="/">
              <p className="text-4xl font-extrabold font-poppins">Giftap</p>
            </Link>
          </div>
        </section>
        <section className="flex justify-center items-center gap-4 py-3">
          <ul className="flex gap-2 justify-center items-center">{navLinks}</ul>
          <section className="flex justify-center gap-4">
            {user && <AdminChat />}
          </section>
        </section>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
      >
        <NavDrawer
          toggleDrawer={toggleDrawer}
          handleLogOut={handleLogOut}
        ></NavDrawer>
      </Drawer>
    </div>
  );
};

export default ScrollNav;
