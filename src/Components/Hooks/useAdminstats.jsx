import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdminstats = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const {
    refetch,
    data: admin = [],
    isLoading,
  } = useQuery({
    queryKey: ["admin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  return [admin, refetch, isLoading];
};

export default useAdminstats;
