import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSellerStat = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    refetch,
    data: sellerStat = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sellerStat", user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // Check for user email
      const res = await axiosPublic.get("/seller/seller-statistics"); // Ensure the correct endpoint
      return res.data;
    },
    enabled: !!user?.email, // Only fetch when the user is logged in
  });

  if (isError) {
    console.error("Error fetching seller statistics:", error);
  }

  return [sellerStat, refetch, isLoading, isError];
};

export default useSellerStat;
