import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useRecentView = () => {
    // const axiosPublic = useAxiosPublic(); // Custom axios instance
    // const { user } = useAuth();
    // const { refetch, data: recentViewProduct = [] } = useQuery({
    //     queryKey: ['recentViews', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get("/recentviews");
    //         return res.data; 
    //     }
    // });

const [recentViewProduct, setRecentViewProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/recentviews")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setRecentViewProduct(data);
        setLoading(false);
      });
  }, []);

  
    return [recentViewProduct, loading]; 
};

export default useRecentView;
