import { IoMdGift } from "react-icons/io";

const HomeSectionHeading = ({ subTitle, title }) => {
  return (
    <div>
      <div className="my-10">
        <p className="text-center text-sm mb-3 text-gray-400 items-center font-serif uppercase flex justify-center">
          <span className="mr-2 text-md text-primary">
            <IoMdGift />
          </span>{" "}
          {subTitle}
        </p>
        <h2 className="text-xl xl:text-2xl font-poppins uppercase pb-5 font-bold text-center">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default HomeSectionHeading;
