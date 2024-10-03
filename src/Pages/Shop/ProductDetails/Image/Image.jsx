import "@smastrom/react-rating/style.css";
import { useState } from "react";

const Image = ({ product }) => {
  const { image, discount } = product ?? {};
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };
  return (
    <div className="w-[35%]">
      <div className="relative overflow-hidden h-96 w-full">
        <div
          className={`absolute inset-0 flex transition-transform duration-700 ease-in-out ${
            currentImage === 0 ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <img
            src={image?.itemImg}
            alt="Item Image 1"
            className="w-full object-cover"
          />
        </div>
        <div
          className={`absolute inset-0 flex transition-transform duration-700 ease-in-out ${
            currentImage === 1 ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <img
            src={image?.itemImg1}
            alt="Item Image 2"
            className="w-full object-cover"
          />
        </div>
        <div className="absolute left-2 top-2">
          <p className=" px-2 text-white bg-primary rounded-lg">{discount}%</p>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => handleImageChange(0)}
          className={`${
            currentImage === 0 ? "bg-gray-900 text-white" : "bg-gray-200"
          }  rounded`}
        >
          <img src={image?.itemImg} className="w-10 h-10" alt="" />
        </button>
        <button
          onClick={() => handleImageChange(1)}
          className={`${
            currentImage === 1 ? "bg-gray-900 text-white" : "bg-gray-200"
          }  rounded`}
        >
          <img src={image?.itemImg1} className="w-10 h-10" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Image;
