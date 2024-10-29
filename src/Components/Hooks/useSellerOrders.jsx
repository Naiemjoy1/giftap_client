import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useSellerOrders = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    refetch,
    data: sellerOrders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sellerOrders", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get("/seller/order-data");
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isError) {
    console.error("Error fetching seller statistics:", error);
  }

  return [sellerOrders, refetch, isLoading, isError];
};

export default useSellerOrders;
