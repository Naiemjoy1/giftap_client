import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useSellers = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: sellers = [] } = useQuery({
    queryKey: ["sellers", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/sellers");
      return res.data;
    },
  });

  return [sellers, refetch];
};

export default useSellers;
