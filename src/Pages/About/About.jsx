import React from "react";

const About = () => {
  return (
    <div className="container mx-auto my-10">
      <header className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <p className='uppercase mb-3 text-primary font-semibold'>Who We Are</p>
              <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">Your Personal Guide to Perfect Gifting</h1>
              <p className="mt-6 text-gray-600 dark:text-gray-300">At Giftap, we believe that a thoughtful gift has the power to brighten someone’s day, strengthen bonds, and create lasting memories. We are more than just an online gifting platform; we are your trusted partner in making meaningful gestures that matter. Whether you are celebrating a milestone, expressing gratitude, or simply surprising someone special, our curated selection of gifts is designed to add a personal touch to every occasion.</p>

            </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img className="object-cover w-full h-full max-w-2xl rounded-md" src="https://i.ibb.co/Lhdw2zL/916362f1-eb44-41fd-9adc-8cfdf0811c66.jpg" alt="glasses photo" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default About;
