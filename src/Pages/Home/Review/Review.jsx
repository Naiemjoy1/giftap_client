import useReviews from "../../../Components/Hooks/useReviews";
import ReviewCard from "./ReviewCard";
import Marquee from "react-fast-marquee";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Review = () => {
  const [reviews] = useReviews();

  const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = (totalRatings / reviews.length).toFixed(1);

  const shuffledReviews = shuffleArray(reviews);

  const uniqueUserEmails = new Set(reviews.map((review) => review.email));
  const displayReviews =
    uniqueUserEmails.size > 1
      ? shuffledReviews.slice(0, 5)
      : [...shuffledReviews.slice(0, 5), ...shuffledReviews.slice(0, 5)];

  return (
    <div className=" mt-10">
      <div className="bg-gradient-to-r from-slate-200 to-pink-200 py-4">
        <div className="relative z-10 p-8">
          <h1 className="text-center text-2xl font-medium font-poppins">
            CUSTOMERS REVIEWS
          </h1>
          <h1 className="text-center text-sm font-opensans">
            We do everything we can to ensure a positive merchant experience
          </h1>
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-4 items-center">
              <h1 className="font-bold text-green-600">{averageRating} / 5</h1>
              <div className="flex space-x-2">
                <Rating
                  style={{ maxWidth: 80 }}
                  value={averageRating}
                  readOnly
                />
              </div>
            </div>
            <h1 className="text-sm font-semibold">
              Trusted by 199,087 clients
            </h1>
          </div>
        </div>

        <Marquee pauseOnHover className="[--duration:20s]">
          <div className="grid grid-cols-5">
            {displayReviews.map((singleReview) => (
              <ReviewCard key={singleReview._id} singleReview={singleReview} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Review;
