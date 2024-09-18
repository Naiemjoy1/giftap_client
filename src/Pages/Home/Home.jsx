import { useState } from "react";
import { useEffect } from "react";

const Home = () => {

  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
console.log(product)
  return (
    <div>
      <p className="font-bold font-poppins">welcome home</p>
      <button className="btn btn-primary font-opensans text-white">
        Primary
      </button>
    </div>
  );
};

export default Home;
