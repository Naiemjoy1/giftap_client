import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  return [users, refetch];
};

export default useUsers;
