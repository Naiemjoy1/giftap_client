import { FaProductHunt } from "react-icons/fa6";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { MdCancel } from "react-icons/md";

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
              <h1 className="text-base font-semibold">Total product</h1>
              <h1 className="text-2xl font-bold mt-2">65</h1>
            </div>
            <div className="text-4xl">
              <FaProductHunt />
            </div>
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
              <h1 className="text-base font-semibold">Total product</h1>
              <h1 className="text-2xl font-bold mt-2">65</h1>
            </div>
            <div className="text-4xl">
              <FaProductHunt />
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
      </div>
      <div className="border border-red-500 w-[45%]">
        <h1>Right side</h1>
      </div>
    </div>
  );
};

export default Dashboard;
