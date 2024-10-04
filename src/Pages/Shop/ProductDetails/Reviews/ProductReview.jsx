import { Rating } from "@material-tailwind/react";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

const ProductReview = ({ product }) => {
  const { name } = product ?? {};

  const [rating, setRating] = useState(0);

  return (
    <div className=" space-y-6">
      <p className=" uppercase text-base font-medium">0 review for {name}</p>
      <section className="flex gap-4 justify-start items-center">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className=" space-y-2">
          <Rating style={{ maxWidth: 80 }} value={3} readOnly />
          <p>
            Name <span className=" text-gray-400">- Date</span>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            voluptate rem quas fuga, quod laborum laudantium iusto assumenda
            quibusdam error in maxime expedita temporibus eaque quos magni sequi
            ut autem.
          </p>
        </div>
      </section>
      <section>
        <p className=" text-lg">Add a review</p>
        <div className="divider divider-primary"></div>
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Rating *</span>
            </label>
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
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
            />
          </div>
          <div className=" mt-6 flex justify-start">
            <button className="btn btn-primary text-white">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProductReview;
