import ReUseCard from "../../../../ReUseComponents/ReUseCard/ReUseCard";

const TopSeller = () => {
  return (
    // this card style will get on ReUseCard Component
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-4">
          <ReUseCard
            productId={'1'}
            productImage={'https://www.jerseybdclub.com/wp-content/uploads/2023/08/Custom-t-shirt-design-and-printing-service-in-BD.jpg'}
            productPrice={'25'}
            productTitle={'Coustom Design'}
            productReview={"1"}
          />
      </div>
    </div>
  );
};

export default TopSeller;
