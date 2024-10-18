import { FaStar } from "react-icons/fa";
import useReviews from "../../../Components/Hooks/useReviews";
import ReviewCard from "./ReviewCard";
import Marquee from "react-fast-marquee";

const Review = () => {
  const [reviews, loading] = useReviews();
  return (
    <div>
      <div className="bg-gradient-to-r from-slate-200 to-pink-200 py-4">
        <div className="relative z-10 p-8">
          <h1 className="text-center text-3xl font-medium">
            CUSTOMERS REVIEWS
          </h1>
          <h1 className="text-center text-base font-medium mt-4">
            We do everything we can do ensure a positive merchant experience
          </h1>
          <div className="flex justify-center items-center space-x-5 mt-4">
            <h1 className="text-xl font-bold  text-green-600">4.9 / 5</h1>
            <div className="flex space-x-2 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h1 className="text-base font-semibold">
              Trusted by 199, 087 clients
            </h1>
          </div>
        </div>
        <Marquee pauseOnHover className="[--duration:20s]">
          {/* Your customer review cards go here */}
          <div className="grid grid-cols-5 gap-4 mt-7">
            {reviews.map((singleReview) => (
              <ReviewCard
                key={singleReview._id}
                singleReview={singleReview}
              ></ReviewCard>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Review;
