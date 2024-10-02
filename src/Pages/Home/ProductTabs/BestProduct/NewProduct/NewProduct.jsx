import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../../../Components/Hooks/useAxiosPublic";
import ReUseCard from "../../../../../ReUseComponents/ReUseCard/ReUseCard";

const NewProduct = () => {
  const [product, setProduct] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get("/products");
        setProduct(response.data);
      } catch (error) {
        console.log("Internal server error", error);
      }
    };
    fetchProducts();
  }, [axiosPublic]);

  return (
    // this card style will get on ReUseCard Component 
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {product.slice(0, 10).map(item => (
          <ReUseCard
            key={item._id}
            productId={item._id}
            productImage={item.image}
            productPrice={item.price}
            productTitle={item.name}
            productReview={'1'}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProduct;