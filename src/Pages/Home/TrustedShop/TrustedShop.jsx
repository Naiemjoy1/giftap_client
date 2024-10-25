import React from "react";
import HomeSectionHeading from "../../../ReUseComponents/HomeSectionHeading/HomeSectionHeading";

const shop = [
  {
    image:
      "https://st3.depositphotos.com/1001860/16375/i/380/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
    title: "Amaazon",
    description: "Delivery within 24 hours",
  },
  {
    image: "https://discovertemplate.com/wp-content/uploads/2024/02/Ebay.jpg",
    title: "E Bay",
    description: "Delivery within 24 hours",
  },
  {
    image:
      "https://sojamanagement.com/wp-content/uploads/2017/11/soja_logo_color.png",
    title: "SOJA",
    description: "Delivery within 24 hours",
  },
  {
    image:
      "https://t4.ftcdn.net/jpg/03/30/78/95/360_F_330789521_9C5UDxs7qYNn0YYSo4mDO1VWij5ovX4v.jpg",
    title: "Savage",
    description: "Delivery within 24 hours",
  },
  {
    image:
      "https://shelteredalliance.org/wp-content/uploads/2023/04/Onehope-Refuge-08.png",
    title: "OneHope",
    description: "Delivery within 24 hours",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4826567/file/still-52bf8f7404e7994b029b8f06a02758fc.png",
    title: "Infinity Review",
    description: "Delivery within 24 hours",
  },
  {
    image:
      "https://via.placeholder.com/150x100/FFFFFF/000000?text=Grocery Outlet",
    title: "Grocery Outlet",
    description: "Delivery within 24 hours",
  },
  {
    image: "https://via.placeholder.com/150x100/ff0000/FFFFFF?text=Staples",
    title: "Staples",
    description: "Delivery within 24 hours",
  },
  // Add more brands as needed
];

const TrustedShop = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <HomeSectionHeading
        subTitle={"Shop with giftap"}
        title={"Our trusted shop"}
      ></HomeSectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {shop.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="mb-2 w-24 h-24 object-cover rounded-full"
            />
            <h3 className="text-md font-semibold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedShop;
