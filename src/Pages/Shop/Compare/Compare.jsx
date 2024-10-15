import React from "react";
import useProducts from "../../../Components/Hooks/useProducts";
import useReviews from "../../../Components/Hooks/useReviews";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const calculateDiscountedPrice = (price, discount) => {
  const discountAmount = price * (discount / 100);
  return price - discountAmount;
};

const Compare = ({ id, handleCloseModal }) => {
  const [products] = useProducts();
  const [reviews] = useReviews();

  const currentProduct = products.find((product) => product._id === id);

  const levenshteinDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= a.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[a.length][b.length];
  };

  const areNamesSimilar = (name1, name2, threshold = 3) => {
    const distance = levenshteinDistance(
      name1.toLowerCase(),
      name2.toLowerCase()
    );
    return distance <= threshold;
  };

  const othersProduct = products.filter((product) => {
    return (
      product.category === currentProduct?.category &&
      product.store_name !== currentProduct?.store_name &&
      areNamesSimilar(product.name, currentProduct?.name)
    );
  });

  const currentProductReviews = reviews.filter(
    (review) => review.productId === id
  );

  const currentProductAverageRating =
    currentProductReviews.length > 0
      ? (
          currentProductReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / currentProductReviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="">
      <h3 className="font-bold text-lg mb-4 text-center">
        Compare with Other Seller's Product
      </h3>

      <div className="flex flex-col lg:flex-row justify-between items-center">
        {currentProduct && (
          <div className="flex flex-col items-center border p-4 w-1/2 space-y-2">
            <p className=" font-bold">Current Store Product</p>
            <div className="w-32 h-32 bg-gray-200 mb-2">
              <img
                src={currentProduct.image.cardImg1}
                alt={currentProduct.name}
              />
            </div>
            <h4 className="font-semibold text-md">{currentProduct.name}</h4>
            <div>
              <Rating
                style={{ maxWidth: 80 }}
                value={currentProductAverageRating}
                readOnly
              />
              <p className="uppercase text-sm">
                {currentProductReviews.length} review
              </p>
            </div>
            {currentProduct.category === "digital gift" ? (
              ""
            ) : (
              <p className="text-gray-700">
                $
                {calculateDiscountedPrice(
                  currentProduct.price,
                  currentProduct.discount
                ).toFixed(2)}{" "}
                <span className="text-gray-400 line-through ml-2">
                  ${currentProduct.price.toFixed(2)}
                </span>
              </p>
            )}

            <p className=" text-sm">Store: {currentProduct.store_name}</p>
            <Link
              onClick={() => {
                handleCloseModal();
              }}
              className="btn-primary btn btn-sm text-white"
            >
              Current
            </Link>
          </div>
        )}

        {othersProduct.length > 0 ? (
          othersProduct.slice(0, 1).map((product) => {
            const otherProductReviews = reviews.filter(
              (review) => review.productId === product._id
            );

            const otherProductAverageRating =
              otherProductReviews.length > 0
                ? (
                    otherProductReviews.reduce(
                      (sum, review) => sum + review.rating,
                      0
                    ) / otherProductReviews.length
                  ).toFixed(1)
                : 0;

            return (
              <div
                key={product._id}
                className="flex flex-col items-center border p-4 w-1/2 space-y-2"
              >
                <p className=" font-bold">Other Store Product</p>
                <div className="w-32 h-32 bg-gray-200 mb-2">
                  <img src={product.image.cardImg1} alt={product.name} />
                </div>
                <h4 className="font-semibold text-md">{product.name}</h4>
                <div>
                  <Rating
                    style={{ maxWidth: 80 }}
                    value={otherProductAverageRating}
                    readOnly
                  />
                  <p className="uppercase text-sm">
                    {otherProductReviews.length} review
                  </p>
                </div>
                {currentProduct.category === "digital gift" ? (
                  ""
                ) : (
                  <p className="text-gray-700">
                    $
                    {calculateDiscountedPrice(
                      product.price,
                      product.discount
                    ).toFixed(2)}{" "}
                    <span className="text-gray-400 line-through ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  </p>
                )}

                <p className=" text-sm">Store: {product.store_name}</p>
                <Link
                  onClick={() => {
                    handleCloseModal();
                  }}
                  to={`/shop/${product._id}`}
                  className="btn-primary btn btn-sm text-white"
                >
                  See More
                </Link>
              </div>
            );
          })
        ) : (
          <p>No similar products found.</p>
        )}
      </div>
    </div>
  );
};

export default Compare;
