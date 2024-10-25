import React from "react";
import ReUseCard from "../../../../ReUseComponents/ReUseCard/ReUseCard";
import useFeature from "../../../../Components/Hooks/useFeature";

const BestProduct = () => {
  const [featureData] = useFeature();

  return (
    // this card style will get on ReUseCard Component
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-4">
        {featureData.map((feature) => (
          <ReUseCard
            productId={"1"}
            productImage={feature.image.cardImg1}
            productPrice={"25"}
            productTitle={feature.name}
            productReview={"1"}
          />
        ))}
      </div>
    </div>
  );
};

export default BestProduct;
