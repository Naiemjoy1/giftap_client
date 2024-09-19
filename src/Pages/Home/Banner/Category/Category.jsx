import useProducts from "../../../../Components/Hooks/useProducts";

const Category = () => {
  const [product, loading] = useProducts();
  const categories = [...new Set(product.map((item) => item.category))];

  return (
    <div>
      <ul className=" space-y-4">
        {categories.map((category, index) => (
          <li key={index} className="mb-4">
            <div>{category}</div>
            {index !== categories.length - 1 && (
              <hr className="border-dashed border-neutral my-2" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
