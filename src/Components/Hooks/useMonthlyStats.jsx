import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useMonthlyStats = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: adminDate = [],
    isLoading,
    isError,
    error, // Capture errors
  } = useQuery({
    queryKey: ["adminDate", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get("/admin/day-wise-payments");
      return res.data;
    },
    enabled: !!user?.email, // Only run the query if the user is authenticated
  });

  if (isError) {
    console.error("Error fetching data:", error);
  }

  return [adminDate, refetch, isLoading, isError];
};

export default useMonthlyStats;
