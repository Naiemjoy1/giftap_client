import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePayment = () => {
    const axiosPublic = useAxiosPublic(); 
  
    const { refetch, data: payments = [] } = useQuery({
      queryKey: ["payments",], 
      queryFn: async () => {
        const res = await axiosPublic.get("/payments"); 
        return res.data;
      },
    });
  
    return [payments, refetch];
};

export default usePayment;