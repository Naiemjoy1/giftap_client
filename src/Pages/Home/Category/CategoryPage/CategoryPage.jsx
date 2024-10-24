import { useLoaderData } from "react-router-dom";
import ReUseCard from "../../../../ReUseComponents/ReUseCard/ReUseCard";

const CategoryPage = () => {
  const products = useLoaderData();

  return (
    <div className="mt-10">

      <div className="bg-gradient-to-r from-primary to-pink-500 text-white py-10 mb-8 text-center">
        <h1 className="text-4xl font-bold">{products[0].category}</h1>
        <p className="mt-2 text-lg">Explore our curated collection of {products[0].category} products.</p>
      </div>


      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <ReUseCard
                  productId={product._id}
                  productImage={product.image.cardImg1}
                  productPrice={product.price}
                  productTitle={product.name}
                  productReview={"1"}
                />

              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
