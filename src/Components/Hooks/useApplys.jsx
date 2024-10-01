import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useApplys = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: applys = [] } = useQuery({
    queryKey: ["applys", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/applys");
      return res.data;
    },
  });

  return [applys, refetch];
};

export default useApplys;
