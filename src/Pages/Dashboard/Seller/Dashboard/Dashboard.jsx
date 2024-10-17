import { FaProductHunt } from "react-icons/fa6";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { MdCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { FaClock } from "react-icons/fa6";
import { FaHandMiddleFinger } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
const Dashboard = () => {
  return (
    <div className="flex space-x-5">
      <div className="border border-green-500 w-[55%]">
        <h1>Hi, user</h1>
        <h1>
          Welcome to 'Giftap' We are so delighted about your arrival on our
          platform.
        </h1>
        <h1>You can see your desired from your personalized dashboard</h1>
        <div className="flex space-x-5 border rounded-2xl p-2 bg-[#E1F7F5]">
          <div>
            <h1>15 % </h1>
            <h1>
              of your profile is <br /> complete
            </h1>
          </div>
          <div>
            <h1>Complete & Organized profile</h1>
            <h1>
              Completing your profile 100% can significantly improve <br /> your
              chances of getting seller faster
            </h1>
            <button className="btn btn-sm rounded-xl px-3 mt-3 bg-blue-950 text-white">
              Complete Profile
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex space-x-10 items-center border w-52 h-28 p-3 rounded-xl mt-4 bg-[#E1F7F5]">
            <div>
              <h1 className="text-base font-semibold">Total product</h1>
              <h1 className="text-2xl font-bold mt-2">65</h1>
            </div>
            <div className="text-4xl">
              <FaProductHunt />
            </div>
          </div>
          <div className="flex space-x-10 items-center border w-52 h-28 p-3 rounded-xl mt-4 bg-[#E1F7F5]">
            <div>
              <h1 className="text-base font-semibold">Total payment</h1>
              <h1 className="text-2xl font-bold mt-2">7500</h1>
            </div>
            <div className="text-4xl">
              <HiMiniCurrencyDollar />
            </div>
          </div>
          <div className="flex space-x-10 items-center border w-52 h-28 p-3 rounded-xl mt-4 bg-[#E1F7F5]">
            <div>
              <h1 className="text-base font-semibold">Total order</h1>
              <h1 className="text-2xl font-bold mt-2">258</h1>
            </div>
            <div className="text-4xl">
              <FaHandMiddleFinger />
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex space-x-10 items-center border w-52 h-28 p-3 rounded-xl mt-4 bg-[#E1F7F5]">
            <div>
              <h1 className="text-base font-semibold">Order confirm</h1>
              <h1 className="text-2xl font-bold mt-2">158</h1>
            </div>
            <div className="text-4xl">
              <SiTicktick />
            </div>
          </div>
          <div className="flex space-x-10 items-center border w-52 h-28 p-3 rounded-xl mt-4 bg-[#E1F7F5]">
            <div>
              <h1 className="text-base font-semibold">Order pending</h1>
              <h1 className="text-2xl font-bold mt-2">25</h1>
            </div>
            <div className="text-4xl">
              <FaClock />
            </div>
          </div>
          <div className="flex space-x-10 items-center border w-52 h-28 p-3 rounded-xl mt-4 bg-[#E1F7F5]">
            <div>
              <h1 className="text-base font-semibold">Order cancel</h1>
              <h1 className="text-2xl font-bold mt-2">15</h1>
            </div>
            <div className="text-4xl">
              <MdCancel />
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-full mt-4 rounded-2xl h-96"
            src="https://i.ibb.co.com/b5KtCpd/Screenshot-2024-10-18-012240.png"
            alt=""
          />
        </div>
      </div>
      <div className="border border-red-500 w-[45%]">
        <h1>Right side</h1>

        <div className=" border w-48 h-40 p-3 rounded-xl mt-4 bg-[#E1F7F5]">
          <div className="flex space-x-20 items-center">
            <h1 className="text-4xl font-semibold mt-2">25</h1>
            <div className="text-4xl">
              <FaMapLocationDot />
            </div>
          </div>
          <h1 className="text-base font-medium mt-2">
            Users in your business area
          </h1>
          <button className="btn btn-xs w-full mt-2 bg-slate-600 text-white">
            view users
          </button>
        </div>
        <div className="p-4 bg-[#E1F7F5] mt-5 rounded-2xl">
          <h1 className="text-lg font-semibold">Notice board</h1>
          <div className="border border-b border-black mt-2"></div>
          <h1 className="text-base font-semibold mt-3">
            Your plan is at least 80 % complete
          </h1>
          <h1 className="mt-2 text-sm font-medium ">
            The seller noticeboard is a dedicated space for important updates,
            announcements, and guidelines for all sellers. It provides essential
            information on upcoming sales, policy changes, promotions, and best
            practices to ensure a smooth and successful selling experience. Stay
            informed and connected!
          </h1>
          <div className="flex items-center mt-2 space-x-3">
            <div>
              <IoCalendarOutline />
            </div>
            <h1 className="text-base font-medium">18 october 2024</h1>
          </div>
        </div>
        <img
          className="w-full rounded-2xl h-96 mt-72"
          src="https://i.ibb.co.com/vV7L7Xk/Screenshot-2024-10-18-012549.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Dashboard;
