import React from "react";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";

const Navbar1 = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  return (
    <div className="mx-2 hidden md:block lg:block">
      <div className="navbar bg-base-100 ">
        <div className="flex-1  ">
          <p className="text-gray-400 ">
            <MdLocationPin />
          </p>
          <p className="text-gray-400 ">Dhaka,Bangladeh</p>
        </div>
        <div className="flex-none hidden md:block lg:block">
          <ul className="menu menu-horizontal px-1">
            <li className="hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold ">
              <Link to={"/login"}>LogIn</Link>
            </li>
            <li className="hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold ">
              <Link to={"/register"}>Register</Link>
            </li>
            <li className="hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold ">
              <Link to={"/"}>Track Orders</Link>
            </li>
            <li className="hover:bg-rose-400 text-gray-400 hover:text-white hover:shadow-lg hover:rounded-md transition duration-300  font-semibold ">
              <Link to={"/"}>Faqs</Link>
            </li>
          </ul>
          {user ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
                    <Link to="/updateprofile">Profile</Link>
                  </button>
                  <button className="btn btn-sm btn-ghost">
                    {user?.displayName || user?.email}
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
            <Link to="/login" className="btn btn-sm bg-primary text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
