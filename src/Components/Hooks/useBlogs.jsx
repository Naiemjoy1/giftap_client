import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlogs = () => {
    const axiosPublic = useAxiosPublic(); // Correctly use useAxiosPublic
  
    const { refetch, data: blogs = [] } = useQuery({
      queryKey: ["blogs",], // Query key should be user-specific if needed
      queryFn: async () => {
        const res = await axiosPublic.get("/blogs"); // Fixed the URL string
        return res.data;
      },
    });
  
    return [blogs, refetch];
};

export default useBlogs;