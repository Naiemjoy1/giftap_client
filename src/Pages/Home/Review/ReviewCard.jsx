import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewCard = ({ singleReview }) => {
  const { user_image, user_name, profession, rating, review } = singleReview;
  return (
    <div className="bg-white w-[350px] border rounded-2xl p-5 ml-4">
      <div className="flex items-center space-x-5">
        <img
          className="w-14 h-14 rounded-full"
          src="https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
          alt=""
        />
        <div>
          <h1 className="text-base font-semibold">{user_name}</h1>
          <h1>{profession}</h1>
          <h1 className="flex space-x-1 mt-1 text-sm">
            <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
          </h1>
        </div>
      </div>
      <div class="border-b-2 border-slate-300 mt-5 ..."></div>
      <h1 className="mt-4 text-base font-medium">{review}</h1>
    </div>
  );
};

export default ReviewCard;
