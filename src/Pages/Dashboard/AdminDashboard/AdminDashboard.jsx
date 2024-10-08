import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaRegEnvelope, FaStore } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);

  const handleTabs = (index) => {
    setTab(index);
  };

  return (
    <div className="flex justify-between ">
      <div className=" w-[20%] pl-10 pr-4 py-4 bg-black space-y-4 h-screen">
        <p className=" text-white text-xl font-bold uppercase">Giftap</p>
        <div className="border-t border-gray-400"></div>
        <div className=" space-y-4">
          <Link
            to="/"
            className="flex gap-2 items-center text-gray-400 px-2 rounded-md py-2"
          >
            <FaStore /> Home
          </Link>
          <p
            className={
              tab === 0
                ? "text-white bg-[#222222] px-2 rounded-md py-2"
                : " text-gray-400 px-2 rounded-md py-2"
            }
            onClick={() => handleTabs(0)}
          >
            Tab 1
          </p>
          <p
            className={
              tab === 1
                ? "text-white bg-[#222222] px-2 rounded-md py-2"
                : "text-gray-400 px-2 rounded-md py-2"
            }
            onClick={() => handleTabs(1)}
          >
            Tab 2
          </p>
        </div>
      </div>
      <div className=" w-[80%]">
        {/* Top bar with search and user-related info */}
        <div className=" shadow-sm w-full flex justify-between gap-14 p-4 items-center">
          {/* Left: Search and calendar */}
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

          {/* Right: User info */}
          <div className="flex items-center gap-4">
            <p className=" text-xl">
              <FaRegEnvelope />
            </p>
            <p className=" text-xl">
              <IoMdNotifications />
            </p>
            <p>Name</p>
            <p>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </p>
            <p>
              <BiSolidDownArrow />
            </p>
          </div>
        </div>

        {/* Conditionally rendered content based on the active tab */}
        <div className="p-4">
          {tab === 0 && <p>Page 1</p>}
          {tab === 1 && <p>Page 2</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
