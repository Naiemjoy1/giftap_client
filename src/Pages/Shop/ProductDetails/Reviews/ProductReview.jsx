import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import useAuth from "../../../../Components/Hooks/useAuth";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useReviews from "../../../../Components/Hooks/useReviews";
import useUsers from "../../../../Components/Hooks/useUsers";

const ProductReview = ({ product }) => {
  const { user } = useAuth();
  const { _id, name } = product ?? {};
  const axiosPublic = useAxiosPublic();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const [reviews, refetch] = useReviews();
  const [users] = useUsers();

  const productReviews = reviews.filter((review) => review.productId === _id);

  const userHasReviewed = productReviews.some(
    (review) => review.email === user?.email
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wordCount = review.trim().split(/\s+/).length;

    if (wordCount < 20) {
      toast.error("Your review must be at least 20 words.");
      return;
    }

    const reviewData = {
      productId: _id,
      email: user?.email,
      rating: rating,
      review: review,
      date: new Date().toLocaleString(),
    };

    try {
      const res = await axiosPublic.post("/reviews", reviewData);
      if (res.status === 200) {
        toast.success(`Review submitted for ${name}`);
      } else {
        toast.error("Failed to submit review");
      }
      setRating(0);
      setReview("");
      refetch();
    } catch (error) {
      console.error(`Error submitting review for ${name}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      <p className="uppercase text-base font-medium">
        {productReviews.length} review{productReviews.length !== 1 ? "s" : ""}{" "}
        for {name}
      </p>
      {productReviews.slice(0, 4).map((review) => {
        const userDetail = users.find((user) => user.email === review.email);
        return (
          <section
            key={review._id}
            className="lg:flex md:flex grid grid-cols-1 gap-4 lg:justify-start md:justify-start justify-center items-center"
          >
            <div className="flex justify-center items-center">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <img
                    src={
                      userDetail?.image ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt={userDetail?.name || "User Avatar"}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p>
                {userDetail ? userDetail.name : "Anonymous"}
                <span className="text-gray-400">
                  {" "}
                  - {new Date(review.date).toLocaleDateString()}
                </span>
              </p>
              <p>{review.review}</p>
            </div>
          </section>
        );
      })}

      <section>
        <p className="text-lg">Add a review</p>
        <div className="divider divider-primary"></div>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Rating *</span>
            </label>
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
              className="text-yellow-500"
              isRequired
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Review *</span>
            </label>
            <textarea
              type="text"
              placeholder="Your Review"
              className="textarea bg-neutral"
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="mt-6 flex justify-start">
            <button
              type="submit"
              className="btn btn-primary text-white"
              disabled={userHasReviewed}
            >
              {userHasReviewed ? "Submitted" : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProductReview;
