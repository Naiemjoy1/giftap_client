import { useEffect, useState } from "react";

const useRecentView = () => {
  const [recentViewProduct, setRecentViewProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/recentviews")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecentViewProduct(data);
        setLoading(false);
      });
  }, []);

  return [recentViewProduct, loading];
};

export default useRecentView;
