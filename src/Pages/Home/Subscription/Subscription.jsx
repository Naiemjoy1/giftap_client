import { Link } from "react-router-dom";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";

const Subscription = () => {
  return (
    <div className="bg-white dark:bg-gray-900 ">
      <div className="container px-6 mx-auto">
        <div className="text-center ">
          <HomeSectionHeading
            title={"Choose Your Subscription"}
            subTitle={
              "Pick a plan that suits your gifting needs and enjoy exclusive perks!"
            }
          ></HomeSectionHeading>
        </div>
        <div className="flex gap-4 flex-wrap items-center justify-center space-y-4 lg:-mx-4 lg:items-stretch lg:space-y-0">
          {/* Free Plan */}
          <div className="flex flex-col w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-primary uppercase">
                Casual
              </h2>
              <span className="pt-2 text-xl font-bold text-gray-800 uppercase dark:text-gray-100">
                Free
              </span>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                <li>Basic access to limited gift categories.</li>
                <li>Send 1-2 gifts per month.</li>
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
          <div className="flex flex-col w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-primary uppercase">
                Premium
              </h2>
              <span className="pt-2 text-xl font-bold text-gray-800 uppercase dark:text-gray-100">
                $24.90
              </span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                <li>Access to more categories and exclusive gifts.</li>
                <li>Send up to 10 gifts monthly.</li>
                <li>Faster delivery and advanced customization.</li>
                <li>Premium-only discounts and event reminders.</li>
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
          <div className="flex flex-col w-full max-w-sm p-8 bg-white border-2 border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-primary  uppercase">
                Luxury
              </h2>
              <span className="pt-2 text-xl font-bold text-gray-800 uppercase dark:text-gray-100">
                $49.90
              </span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                <li>Unlimited gifts and access to luxury items.</li>
                <li>Same-day delivery and personalized concierge service.</li>
                <li>Full gift customization with exclusive VIP discounts.</li>
                <li>24/7 priority support and special event invitations.</li>
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
    </div>
  );
};

export default Subscription;
