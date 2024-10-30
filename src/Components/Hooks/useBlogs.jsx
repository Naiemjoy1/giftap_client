import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlogs = (search) => {
    const axiosPublic = useAxiosPublic();  
  
    const { refetch, data: blogs = [],  } = useQuery({
      queryKey: ["blogs",], 
      queryFn: async () => {
        const res = await axiosPublic.get(`/blogs?search=${search}`);  
        return res.data;
      },
    });
  
    return [blogs, refetch];
};

export default useBlogs;