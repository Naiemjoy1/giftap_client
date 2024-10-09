import useProducts from "../../../../Components/Hooks/useProducts";

const EditProduct = ({ id }) => {
  const [products, loading, refetch] = useProducts();

  const product = products.find((p) => p._id === id);
  console.log("product", product);

  const { name } = product ?? {};
  return (
    <div>
      <p>EditProduct:{id}</p>
    </div>
  );
};

export default EditProduct;
