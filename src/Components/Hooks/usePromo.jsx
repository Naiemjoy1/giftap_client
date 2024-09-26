import { useEffect, useState } from "react";

const usePromo = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/promos")
      .then((res) => res.json())
      .then((data) => {
        setPromo(data);
        setLoading(false);
      });
  }, []);

  return [promo, loading];
};

export default usePromo;
