import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useApplys = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    refetch,
    data: applys = [],
    isLoading,
  } = useQuery({
    queryKey: ["applys", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/applys");
      return res.data;
    },
  });

  return [applys, refetch, isLoading];
};

export default useApplys;
