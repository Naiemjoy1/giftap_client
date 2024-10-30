import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

import img1 from "../../../../../assets/Images/Banner/skin3.png";
import img2 from "../../../../../assets/Images/Banner/skin1.png";
import img3 from "../../../../../assets/Images/Banner/skin2.png";

const Slide2 = () => {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center gap-4 lg:h-[80vh] md:h-[80vh] bg-[#edeef1] lg:px-28 px-4 py-4 md:py-0 lg:py-0">
      <div className="lg:w-[60%] md:w-1/2 lg:space-y-8 space-y-4">
        <div className="lg:w-4/5 space-y-4">
          <p className=" text-4xl lg:text-6xl font-medium font-poppins">
            Beauty & Wellness for Your Inner Glow
          </p>
          <p className="font-opensans">
            Indulge in self-care with our curated beauty and wellness
            essentials. From nourishing skincare to holistic wellness products,
            we offer everything you need to look and feel your best, inside and
            out.
          </p>
          <Link
            to="/shop"
            className="btn btn-primary px-6 text-white rounded-full py-1 font-opensans"
          >
            Start Shopping
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 bg-white rounded-badge py-2 px-2 w-1/2">
            <img className="h-14 lg:h-32" src={img2} alt="Tulip Package" />
            <div className="space-y-0 lg:space-y-2">
              <p className="font-semibold">Spa </p>
              <p className="text-xl font-light">$20.99</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-badge py-2 px-2 w-1/2">
            <img className="lg:h-32 h-14" src={img3} alt="Tulip Package" />
            <div className="space-y-0 lg:space-y-2">
              <p className="font-semibold">Skincare </p>
              <p className="text-xl font-light">$24.99</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2  lg:w-[40%] lg:flex items-end h-full relative">
        <img
          className="object-cover h-full absolute left-0 bottom-0 pl-4"
          src={img1}
          alt="Beauty & Wellness for Your Inner Glow"
        />
      </div>
    </div>
  );
};

export default Slide2;
