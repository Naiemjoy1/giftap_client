import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error); // Log error
        throw error; // Re-throw error for React Query to handle
      }
    },
  });

  return [users, refetch, isLoading];
};

export default useUsers;
