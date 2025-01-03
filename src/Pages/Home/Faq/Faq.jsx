import { useState } from "react";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";

const faqData = [
  {
    question: "What is Giftap?",
    answer:
      "Giftap is an online platform that allows users to discover, personalize, and send unique gifts to their loved ones. Whether for birthdays, anniversaries, or any special occasion, Giftap makes gifting easy and memorable.",
  },
  {
    question: "How does Giftap work?",
    answer:
      "Simply browse through our curated selection of gifts, choose the perfect one, personalize it with a message or custom features, and complete the checkout process. We handle the rest, ensuring your gift is delivered to the recipient with care.",
  },
  {
    question: "Can I customize my gift?",
    answer:
      "Yes! Many of our gifts come with customizable options, such as engraving, custom messages, or even selecting specific colors and styles to match your preferences.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and online payment options such as PayPal, Google Pay, and Apple Pay. Bkash, Nagad",
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
        subTitle={"How its work"}
        title={"Frequently asked questions"}
      ></HomeSectionHeading>

      <div className="container 2xl:w-[70%] mx-auto px-4">
        <div className="flex flex-col divide-y ">
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
    </>
  );
};

export default Faq;
