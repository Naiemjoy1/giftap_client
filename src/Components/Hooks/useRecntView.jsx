import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRecntView = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: recentviews = [] } = useQuery({
    queryKey: ["recentviews", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/recentviews");
      return res.data;
    },
  });

  return [recentviews, refetch];
};

export default useRecntView;
