import React, { useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaBars, FaRegEnvelope, FaRegHeart } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import NavDrawer from "../Drawer/NavDrawer";
import Search from "./Search";
import useCart from "../../../Components/Hooks/useCart";
import useWishs from "../../../Components/Hooks/useWishs";
import AdminChat from "../../../Pages/Support/AdminChat/AdminChat";

const Searchbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [carts] = useCart();
  const [wishlists, refetchWish] = useWishs();

  const userCarts = carts.filter((cart) => cart?.email === user?.email);
  const usersWishs = wishlists.filter((wish) => wish.email === user?.email);

  return (
    <div className="container mx-auto py-4 font-opensans">
      {/* medium and small screens */}
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
                  {userCarts.length}
                </div>
              </Link>
              <AdminChat></AdminChat>
            </section>
          </section>
        </div>
      </div>

      {/* large devices */}
      <div className=" justify-between items-center gap-14 hidden lg:flex">
        <div>
          <Link to="/">
            <p className="text-4xl font-extrabold font-poppins">Giftap</p>
          </Link>
        </div>
        <div className="flex-grow">
          <Search></Search>
        </div>

        <div className="flex justify-center gap-10 items-center text-sm ">
          <section className="flex justify-center items-center gap-2">
            <p className="w-10 h-10 rounded-full border flex items-center justify-center">
              <FaRegEnvelope />
            </p>
            <section>
              <p>support@example.com</p>
              <p className="text-sm text-gray-400">Contact Email</p>
            </section>
          </section>
          <section className="flex justify-between items-center gap-4">
            <section>
              <p className="font-semibold">$0.00</p>
            </section>
            <section>
              {user ? (
                <div className="dropdown dropdown-left">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.photoURL ||
                          "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                        }
                        alt=""
                      />
                    </div>
                  </label>
                  <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary text-white rounded-box w-52">
                    <li>
                      <button className="btn btn-sm btn-ghost">
                        <Link to="/profile">
                          {user?.displayName || user?.email}
                        </Link>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="btn btn-sm btn-ghost"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <p className="w-10 h-10 rounded-full border flex items-center justify-center text-lg">
                    <BiUser />
                  </p>
                </Link>
              )}
            </section>
            <section>
              <div className="relative">
                <p className="text-2xl">
                  <FaRegHeart />
                </p>
                <div className="bg-primary absolute -top-2 -right-3 transform translate-x-1 -translate-y-1 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                  {usersWishs.length}
                </div>
              </div>
            </section>
            <section>
              <Link to="/cart" className="relative">
                <p className="text-2xl">
                  <HiOutlineShoppingBag />
                </p>
                <div className="bg-primary absolute -top-2 -right-2 transform translate-x-1 -translate-y-1 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                  {userCarts.length}
                </div>
              </Link>
            </section>
          </section>
        </div>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
      >
        <NavDrawer
          toggleDrawer={toggleDrawer}
          user={user}
          handleLogOut={handleLogOut}
        ></NavDrawer>
      </Drawer>
    </div>
  );
};

export default Searchbar;
