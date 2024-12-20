import { useParams } from "react-router-dom";
import useProducts from "../../../Components/Hooks/useProducts";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbVaccineBottleOff } from "react-icons/tb";
import Image from "./Image/Image";
import Middle from "./Middle/Middle";
import { useState } from "react";
import Description from "./Description/Description";
import ProductReview from "./Reviews/ProductReview";
import Information from "./Information/Information";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import RecentView from "../RecentView/RecentView";
import useReviews from "../../../Components/Hooks/useReviews";

const ProductDeatails = () => {
  const { id } = useParams();
  const [products, loading] = useProducts();

  const product = products.find((p) => p._id === id);
  const { _id, name } = product ?? {};

  const [reviews] = useReviews();

  const productReviews = reviews.filter((review) => review.productId === _id);

  // Calculate average rating
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((sum, review) => sum + review.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : 0;

  const [activeTab, setActiveTab] = useState("description");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Title
  document.title = `GifTap || ${name}`;

  return (
    <div className="bg-neutral py-10">
      <div className="container mx-auto space-y-10 px-4 lg:px-0">
        <div className="p-6 bg-white rounded-lg">
          <p className=" text-xl font-semibold font-poppins">{name}</p>
          <div className="flex gap-4 text-xs mt-4">
            <section className="flex gap-2 items-center">
              <Rating style={{ maxWidth: 80 }} value={averageRating} readOnly />
              <p className="uppercase font-opensans">
                {productReviews.length} review
              </p>
            </section>
            <p>|</p>
            <p>
              <span className="font-opensans text-gray-400">SKU:</span>{" "}
              {product.sku}
            </p>
          </div>
          <div className="lg:flex justify-between gap-8 mt-4 space-y-4">
            <Image product={product}></Image>

            <Middle product={product}></Middle>
            <section className="lg:w-[30%] p-6 bg-gray-100 space-y-6 h-1/2 font-opensans">
              <p className="flex gap-4 text-sm">
                <span className=" text-xl">
                  <LiaShippingFastSolid />
                </span>
                Free Shipping apply to all orders over $100
              </p>
              <p className="flex gap-4 text-sm">
                <span className=" text-xl">
                  <TbVaccineBottleOff />
                </span>
                Guranteed 100% Organic from natural farmas
              </p>
              <p className="flex gap-4 text-sm">
                <span className=" text-xl">
                  <RiMoneyDollarCircleLine />
                </span>
                1 Day Returns if you change your mind
              </p>
            </section>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg font-poppins">
          <section className="flex gap-6 uppercase">
            <p
              onClick={() => setActiveTab("description")}
              className={`cursor-pointer ${
                activeTab === "description" ? "font-bold" : ""
              }`}
            >
              Description
            </p>
            <p
              onClick={() => setActiveTab("information")}
              className={`cursor-pointer ${
                activeTab === "information" ? "font-bold" : ""
              }`}
            >
              additional Information
            </p>
            <p
              onClick={() => setActiveTab("review")}
              className={`cursor-pointer ${
                activeTab === "review" ? "font-bold" : ""
              }`}
            >
              Review ({productReviews.length})
            </p>
          </section>
          <div className="divider divider-primary"></div>
          <section>
            {activeTab === "description" && <Description></Description>}
            {activeTab === "information" && <Information></Information>}
            {activeTab === "review" && (
              <ProductReview product={product}></ProductReview>
            )}
          </section>
        </div>
        <div className=" space-y-2">
          <p className=" uppercase text-lg font-medium font-poppins">
            related products
          </p>
          <div className="p-4 bg-white rounded-lg ">
            <RelatedProducts id={id}></RelatedProducts>
          </div>
        </div>
        <div className=" space-y-2">
          <p className=" uppercase text-lg font-medium font-poppins">
            recently viewed products
          </p>
          <div className="p-4 bg-white rounded-lg">
            <RecentView id={id}></RecentView>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeatails;
