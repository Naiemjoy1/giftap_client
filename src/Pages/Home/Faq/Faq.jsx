import { useState } from "react";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";

const faqData = [
  {
    question: "Optio maiores eligendi molestiae totam dolores similique?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.",
  },
  {
    question: "Modi dolorem veritatis culpa quos consequuntur beatae?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aspernatur quae, eos explicabo odit minima libero veniam similique quibusdam.",
  },
  {
    question: "Magni reprehenderit possimus debitis?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptates aspernatur dolores in consequatur doloremque inventore reprehenderit.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
<HomeSectionHeading 
    subTitle={'How its work'}
    title={'Frequently asked questions'}
></HomeSectionHeading>

    <section className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
          {faqData.map((faq, index) => (
            <div key={index}>
              <button
                className="py-4 text-left w-full focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl cursor-pointer outline-none">
                  {faq.question}
                </h3>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p className="px-4 pb-4 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </>
  );
};

export default Faq;
