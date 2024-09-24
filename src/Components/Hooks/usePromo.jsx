import { useEffect, useState } from "react";

const usePromo = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./promo.json")
      .then((res) => res.json())
      .then((data) => {
        setPromo(data);
        setLoading(false);
      });
  }, []);

  return [promo, loading];
};

export default usePromo;
