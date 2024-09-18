import useProducts from "../../Components/Hooks/useProducts";

const Home = () => {
  const [products, loading] = useProducts();

  return (
    <div>
      <p>Number of Products: {products.length}</p>
      <p className="font-bold font-poppins">Welcome Home</p>
      <button className="btn btn-primary font-opensans text-white">
        Primary
      </button>
    </div>
  );
};

export default Home;
