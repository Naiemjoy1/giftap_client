import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

const RelatedProducts = () => {
  return (
    <div>
      <div className="relative group">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="mt-4 space-y-2">
          <p className="text-lg font-medium">Lorem ipsum dolor sit.</p>
          <p className="text-green-600 uppercase text-xs">in stock</p>
          <p className="flex gap-2 items-center">
            <Rating style={{ maxWidth: 80 }} value={3} readOnly />
            <span>0</span>
          </p>
          <p className="text-primary font-medium">$0.00</p>
          <button className="btn btn-outline btn-primary w-full rounded-full">
            Add to cart
          </button>
        </div>
        <div className="absolute left-2 top-2">
          <p className=" px-2 text-white bg-primary rounded-lg">25%</p>
        </div>

        <div className="grid grid-cols-1 gap-2 absolute top-4 right-4 transform translate-x-full opacity-0 invisible transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible">
          <button className="bg-white shadow-xl p-2 rounded-full text-lg">
            <BsArrowsFullscreen />
          </button>
          <button className="bg-white shadow-xl p-2 rounded-full text-lg">
            <FaRegHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
