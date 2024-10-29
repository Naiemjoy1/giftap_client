import { Link } from "react-router-dom";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";

const Subscription = () => {
  return (
    <div className="container 2xl:w-[70%] mx-auto">
      <div className="text-center ">
        <HomeSectionHeading
          title={"Choose Your Subscription"}
          subTitle={"Pick a plan that suits your gifting"}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 px-4 py-4">
        {/* Casual Plan */}
        <div className="flex flex-col w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 h-[400px]">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-primary uppercase">
              Casual
            </h2>
            <span className="pt-2 text-xl font-bold text-gray-800 uppercase dark:text-gray-100">
              Free
            </span>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              <li>Basic access </li>
              <li>1-2 gifts per month.</li>
              <li>Standard delivery.</li>
              <li>Occasional discounts.</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link to={"/choose-payment-method"}>
              <button className="w-full px-4 py-2 font-semibold text-white bg-primary rounded-lg hover:bg-[#d93b48] transition-colors duration-300">
                Start Free
              </button>
            </Link>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="flex flex-col w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 h-[400px]">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-primary uppercase">
              Premium
            </h2>
            <span className="pt-2 text-xl font-bold text-gray-800 uppercase dark:text-gray-100">
              $24.90
            </span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              <li>Access to more categories</li>
              <li>Send 10 gifts monthly.</li>
              <li>Faster delivery </li>
              <li>Premium-only discounts </li>
            </ul>
          </div>
          <div className="mt-4">
            <Link to={"/choose-payment-method"}>
              <button className="w-full px-4 py-2 font-semibold text-white bg-primary rounded-lg hover:bg-[#d93b48] transition-colors duration-300">
                Start Premium
              </button>
            </Link>
          </div>
        </div>

        {/* Luxury Plan */}
        <div className="flex flex-col w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 h-[400px]">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-primary uppercase">
              Luxury
            </h2>
            <span className="pt-2 text-xl font-bold text-gray-800 uppercase dark:text-gray-100">
              $49.90
            </span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              <li>Unlimited gifts </li>
              <li>Same-day delivery</li>
              <li>Exclusive VIP discounts.</li>
              <li>24/7 priority support </li>
            </ul>
          </div>
          <div className="mt-4">
            <Link to={"/choose-payment-method"}>
              <button className="w-full px-4 py-2 font-semibold text-white bg-primary rounded-lg hover:bg-[#d93b48] transition-colors duration-300">
                Start Luxury
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
