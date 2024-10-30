import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useUsers from "../../../Components/Hooks/useUsers";

const ReviewCard = ({ singleReview }) => {
  const [users] = useUsers();

  const { email, rating, review } = singleReview;

  const currentUser = users.find((user) => user.email === email);

  return (
    <div className="bg-white w-[350px] border rounded-2xl p-5 ml-4">
      <div className="flex items-center space-x-5">
        <img
          className="w-10 h-10 rounded-full"
          src={currentUser?.image}
          alt=""
        />
        <div>
          <p className="text-base font-semibold">{currentUser?.name}</p>
          <h1 className="flex  text-sm">
            <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
          </h1>
        </div>
      </div>
      <div class="border-b-2 border-slate-300 mt-4"></div>
      <h1 className="mt-4 text-sm">{review}</h1>
    </div>
  );
};

export default ReviewCard;
