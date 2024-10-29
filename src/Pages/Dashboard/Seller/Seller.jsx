import { useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useSellerTabs from "../../../Components/Hooks/useSellerTabs";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaRegEnvelope, FaStore } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

const Seller = () => {
  const { user, logOut } = useAuth();
  const [tabsData] = useSellerTabs();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleTabs = (index) => {
    setTab(index);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="font-opensans">
      <div className="lg:hidden mt-5">
        <div className="mx-auto text-xs grid md:grid-cols-5 grid-cols-3 justify-items-center items-center gap-2">
          {tabsData.map((aTabs) => (
            <p
              key={aTabs.tab}
              className={
                tab === aTabs.tab
                  ? "text-white bg-[#222222] px-2 rounded-md py-2"
                  : "text-gray-400 px-2 rounded-md py-2"
              }
              onClick={() => handleTabs(aTabs.tab)}
            >
              <span className="flex items-center gap-2 justify-center">
                {aTabs.icon}
                {aTabs.name}
              </span>
            </p>
          ))}

          <Link
            to="/"
            className="flex gap-2 items-center justify-center text-gray-400 px-2 rounded-md py-2"
          >
            <FaStore /> Home
          </Link>

          <div className="flex items-center justify-center gap-4">
            <p>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                    }
                    alt="User avatar"
                  />
                </div>
              </div>
            </p>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <BiSolidDownArrow />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
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
          </div>
        </div>

        <div className="p-4 bg-[#f8f8f8]">
          {tabsData.map(
            (aTabs) =>
              tab === aTabs.tab && <div key={aTabs.tab}>{aTabs.page}</div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="lg:block hidden">
        <div className="flex justify-between bg-[#f8f8f8]">
          <div className="w-[20%] pl-10 pr-4 py-4 bg-black space-y-4 h-screen flex flex-col justify-between">
            <div>
              <a href="/" className="text-white text-xl font-bold uppercase">
                Giftap
              </a>
              <div className="border-t border-gray-400 mt-2"></div>
              <div className="space-y-4 uppercase text-sm mt-10">
                {tabsData.map((aTabs) => (
                  <p
                    key={aTabs.tab}
                    className={
                      tab === aTabs.tab
                        ? "text-white bg-[#222222] px-2 rounded-md py-2"
                        : "text-gray-400 px-2 rounded-md py-2"
                    }
                    onClick={() => handleTabs(aTabs.tab)}
                  >
                    <span className="flex items-center gap-2 cursor-pointer">
                      {aTabs.icon}
                      {aTabs.name}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div className="border-t border-gray-400"></div>
              <Link
                to="/"
                className="flex gap-2 items-center text-gray-400 px-2 rounded-md py-2"
              >
                <FaStore /> Home
              </Link>
            </div>
          </div>

          <div className="lg:w-[80%]">
            <div className="shadow-sm w-full flex justify-between lg:gap-14 p-4 items-center">
              <div className="flex items-center gap-4">
                <label className="input input-bordered hidden lg:flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <div className="hidden lg:block">
                  <Flatpickr
                    data-enable-time
                    options={{
                      minDate: "today",
                      static: true,
                    }}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-xl">
                  <FaRegEnvelope />
                </p>
                <p className="text-xl">
                  <IoMdNotifications />
                </p>
                <p>{user?.displayName || user?.email}</p>
                <p>
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={
                          user?.photoURL ||
                          "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                        }
                      />
                    </div>
                  </div>
                </p>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <BiSolidDownArrow />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
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
              </div>
            </div>

            <div className="p-4">
              {tabsData.map(
                (aTabs) =>
                  tab === aTabs.tab && <div key={aTabs.tab}>{aTabs.page}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
