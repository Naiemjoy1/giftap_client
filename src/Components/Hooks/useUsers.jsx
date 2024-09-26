import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  const axiosPublic = useAxiosPublic(); // Correctly use useAxiosPublic
  const { user } = useAuth();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", user?.email], // Query key should be user-specific if needed
    queryFn: async () => {
      const res = await axiosPublic.get("/users"); // Fixed the URL string
      return res.data;
    },
  });

  return [users, refetch]; // Return users, not cart
};

export default useUsers;
