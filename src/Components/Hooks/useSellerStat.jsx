import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useSellerStat = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const {
    refetch,
    data: sellerData = [],
    isLoading,
  } = useQuery({
    queryKey: ["sellerData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/orders");
      return res.data;
    },
  });

  return [sellerData, refetch, isLoading];
};

export default useSellerStat;
