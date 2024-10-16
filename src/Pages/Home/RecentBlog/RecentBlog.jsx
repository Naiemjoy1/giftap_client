import React from "react";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";
import { Link } from "react-router-dom";

const RecentBlog = () => {
  return (
    <>
      <HomeSectionHeading
        subTitle={"gain knowldges"}
        title={"our latest blog"}
      ></HomeSectionHeading>

      <section className="bg-white dark:bg-gray-100 dark:text-gray-800">
        <div className="container max-w-screen-xl p-6 mx-auto space-y-10 sm:space-y-16">
          {/* Featured Blog */}
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-6 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-white dark:bg-gray-50 shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300"
          >
            <img
              src="https://i.ytimg.com/vi/O306ET58M4E/maxresdefault.jpg"
              alt="Featured Blog"
              className="object-cover w-full h-64 rounded-t-lg sm:h-96 lg:rounded-t-none lg:rounded-l-lg lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-3 lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-3xl font-semibold sm:text-4xl text-gray-800 dark:text-gray-900 group-hover:underline group-focus:underline">
                How to Choose the Perfect Dress for a Girl: Your Ultimate Guide
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-600">
                February 19, 2021
              </span>
              <p className="text-gray-700 dark:text-gray-700">
                Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est
                in graece fuisset, eos affert putent doctus id.
              </p>
            </div>
          </a>

          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-white dark:bg-gray-50 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              <img
                role="presentation"
                className="object-cover w-full h-44 dark:bg-gray-500"
                src="https://cdn.shopify.com/s/files/1/0606/0752/9172/files/How_To_Choose_Perfect_Gift_For_Your_Partner.jpg"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-900 group-hover:underline group-focus:underline">
                  How to Choose the First Gift for Your Girlfriend
                </h3>
                <span className="text-sm dark:text-gray-600">
                  January 21, 2021
                </span>
                <p className="text-gray-700 dark:text-gray-700">
                  Mei ex aliquid eleifend forensibus, quo ad dicta apeirian
                  neglegentur, ex has tantas percipit perfecto.
                </p>
              </div>
            </a>

            {/* Blog Card 2 */}
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-white dark:bg-gray-50 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              <img
                role="presentation"
                className="object-cover w-full h-44 dark:bg-gray-500"
                src="https://www.success.com/wp-content/uploads/2020/11/25-Holiday-Gift-Ideas-That-Support-Minority-Owned-Businesses-1024x682.jpg"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-900 group-hover:underline group-focus:underline">
                  What Are Some Gifts That Will Cheer Up Your Boyfriend?
                </h3>
                <span className="text-sm dark:text-gray-600">
                  January 22, 2021
                </span>
                <p className="text-gray-700 dark:text-gray-700">
                  At per tempor albucius perfecto, ei probatus consulatu
                  patrioque mea.
                </p>
              </div>
            </a>

            {/* Blog Card 3 */}
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-screen-xl mx-auto group hover:no-underline focus:no-underline bg-white dark:bg-gray-50 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              <img
                role="presentation"
                className="object-cover w-full h-44 dark:bg-gray-500"
                src="https://images.indianexpress.com/2024/05/collage-mother-s-day-greetings.jpg"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-900 group-hover:underline group-focus:underline">
                  How to Make Your Mother Happy
                </h3>
                <span className="text-sm dark:text-gray-600">
                  January 23, 2021
                </span>
                <p className="text-gray-700 dark:text-gray-700">
                  Ex has tantas percipit perfecto. Ei vocent delicata indoctum
                  pri.
                </p>
              </div>
            </a>
          </div>



          <div className="flex justify-center">
            <Link to='/blog'>
              <button
                className="btn text-white py-3 px-6 md:py-[16px] md:px-[40px] rounded-3xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-black hover:bg-red-700 transition-all duration-500 ease-in-out"
                style={{ backgroundColor: "rgb(240, 72, 84)" }}
              >
                See All Blogs
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentBlog;
