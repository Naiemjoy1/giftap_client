import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useWishs = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    refetch: refetchWish,
    data: wishlists = [],
    isLoading,
  } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/wishlists");
      return res.data;
    },
  });

  return [wishlists, refetchWish, isLoading];
};

export default useWishs;
