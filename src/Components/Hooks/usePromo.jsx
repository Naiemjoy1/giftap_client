import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const usePromo = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: promo = [] } = useQuery({
    queryKey: ["promo", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/promos");
      return res.data;
    },
  });

  return [promo, refetch];
};

export default usePromo;
