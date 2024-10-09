import React from "react";
import { FaShippingFast, FaDollarSign, FaTools, FaRocket } from "react-icons/fa";
import { PiRocketLaunch } from "react-icons/pi";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";

const FeatureSection = () => {
  const features = [
    {
      Icon: FaShippingFast,
      title: "Worldwide Delivery",
      description:
        "Design and sell custom products online with print on demand dropshipping",
    },
    {
      Icon: FaDollarSign,
      title: "Value for Money",
      description:
        "Aprin is 100% free to use with no hidden fees, monthly fees, or setup fees",
    },
    {
      Icon: FaTools,
      title: "Reliable Service",
      description:
        "The super simple design tool allows you to create a design with our built-in maker tool",
    },
    {
      Icon: FaRocket,
      title: "High Quality",
      description:
        "Make a lasting impression with our industry-leading technology, quality inks",
    },
    {
      Icon: PiRocketLaunch,
      title: "Fast Fulfillment",
      description:
        "Design your personalized printing anytime and anywhere, and get your products fast",
    },
  ];

  return (
    <>
      <HomeSectionHeading
        subTitle="why choose us"
        title={
          <>
            reasonably priced of & <br /> superior quality
          </>
        }
      ></HomeSectionHeading>

      <div className="bg-white px-6 py-8 md:px-10 md:py-12 lg:px-20 lg:py-16">
        {/* Center the container on large screens */}
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                <feature.Icon className="mx-auto text-4xl text-[#F04854] mb-4 transition-transform duration-300 transform hover:scale-110" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
