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

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Why we are unique</h2>

            <p className="mt-4 text-gray-600">

              Giftap stands out with its custom gift scheduling feature, allowing users to plan gifts in advance for any occasion. Our platform is designed with a fully Zen-Z inspired, user-friendly interface, offering a smooth and hassle-free experience. The perfect blend of functionality and elegance ensures that every visit to Giftap is enjoyable and efficient.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2">
            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-primary bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-xl font-medium text-gray-700 capitalize dark:text-white">Diverse Expertise</h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                  Our team brings together specialists in web development, design, and user experience, ensuring that every aspect of Giftap is crafted with precision and creativity.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-primary bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-xl font-medium text-gray-700 capitalize dark:text-white">Customer-Centric Approach</h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                  We prioritize the needs and preferences of our users, constantly improving our platform based on feedback to enhance the gifting experience.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-primary bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-xl font-medium text-gray-700 capitalize dark:text-white">Passionate Innovators</h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                  Our team is driven by a passion for innovation, regularly introducing new features like custom gift scheduling to keep Giftap ahead in the market.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-primary bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-xl font-medium text-gray-700 capitalize dark:text-white">Commitment to Excellence</h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                  Our team is dedicated to delivering top-quality service, constantly refining our processes to maintain high standards of performance and reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
