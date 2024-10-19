import { BiSolidDownArrow } from "react-icons/bi";
import { FaRegEnvelope, FaStore } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import useAuth from "../../../Components/Hooks/useAuth";
import { useState } from "react";
import useAdminTabs from "../../../Components/Hooks/useAdminTabs";

const Admin = () => {
  const { user, logOut } = useAuth();
  const [tabsData] = useAdminTabs();

  const [tab, setTab] = useState(0);

  const handleTabs = (index) => {
    setTab(index);
  };

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-between">
      <div className="w-[20%] pl-10 pr-4 py-4 bg-black space-y-4 h-screen">
        <p className="text-white text-xl font-bold uppercase">Giftap</p>
        <div className="border-t border-gray-400"></div>
        <div className="space-y-4 uppercase text-sm">
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
              <span className="flex items-center gap-2">
                {aTabs.icon}
                {aTabs.name}
              </span>
            </p>
          ))}
          <Link
            to="/"
            className="flex gap-2 items-center text-gray-400 px-2 rounded-md py-2"
          >
            <FaStore /> Home
          </Link>
        </div>
      </div>

      <div className="w-[80%]">
        <div className="shadow-sm w-full flex justify-between gap-14 p-4 items-center">
          <div className="flex items-center gap-4">
            <label className="input input-bordered flex items-center gap-2">
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
            <Flatpickr
              data-enable-time
              options={{
                minDate: "today",
                static: true,
              }}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
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
            <p>
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
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#f8f8f8]">
          {tabsData.map(
            (aTabs) =>
              tab === aTabs.tab && <div key={aTabs.tab}>{aTabs.page}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
