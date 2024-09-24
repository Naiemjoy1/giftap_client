import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const usePromo = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

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
