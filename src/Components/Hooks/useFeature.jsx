import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useFeature = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: featureData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featureData", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get("/admin/featured-products");
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isError) {
    console.error("Error fetching data:", error);
  }

  return [featureData, refetch, isLoading, isError];
};

export default useFeature;
