import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useComplain = (search) => {
    const axiosPublic = useAxiosPublic();  
  
    const { refetch, data: complains = [],  } = useQuery({
      queryKey: ["complains",], 
      queryFn: async () => {
        const res = await axiosPublic.get(`/complain`);  
        return res.data;
      },
    });
  
    return [complains, refetch];
};

export default useComplain;