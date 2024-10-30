import ReUseCard from "../../../../ReUseComponents/ReUseCard/ReUseCard";
import useFeature from "../../../../Components/Hooks/useFeature";

const BestProduct = () => {
  const [featureData] = useFeature();

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4 px-4">
        {featureData.slice(0, 10).map((feature) => (
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
