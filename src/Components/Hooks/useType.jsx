import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useType = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userType, isLoading } = useQuery({
    queryKey: [user?.email, "userType"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/type/${user.email}`);
      return res.data?.type;
    },
  });

  return [userType, isLoading];
};

export default useType;
