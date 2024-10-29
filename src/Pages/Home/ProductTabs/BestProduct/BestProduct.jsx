import ReUseCard from "../../../../ReUseComponents/ReUseCard/ReUseCard";
import useFeature from "../../../../Components/Hooks/useFeature";

const BestProduct = () => {
  const [featureData] = useFeature();

  return (
    // this card style will get on ReUseCard Component
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {featureData.map((feature) => (
          <ReUseCard
            productId={feature._id}
            productImage={feature.image.cardImg1}
            productPrice={feature.price}
            productTitle={feature.name}
            productReview={"1"}
          />
        ))}
      </div>
    </div>
  );
};

export default BestProduct;
