import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useNotice = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: notice = [] } = useQuery({
    queryKey: ["notice", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/notice");
      return res.data;
    },
  });

  return [notice, refetch];
};

export default useNotice;