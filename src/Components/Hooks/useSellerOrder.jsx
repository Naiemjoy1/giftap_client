import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useSellerOrder = () => {
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
      if (!user?.email) return [];
      const res = await axiosPublic.get("/seller/seller-orders");
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isError) {
    console.error("Error fetching seller statistics:", error);
  }

  return [sellerStat, refetch, isLoading, isError];
};

export default useSellerOrder;
