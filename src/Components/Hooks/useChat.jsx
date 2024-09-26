import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useChat = () => {
  const axiosPublic = useAxiosPublic(); // Correctly use useAxiosPublic
  const { user } = useAuth();

  const { refetch, data: chats = [] } = useQuery({
    queryKey: ["chats", user?.email], // Query key should be user-specific if needed
    queryFn: async () => {
      const res = await axiosPublic.get("/chats"); // Fixed the URL string
      return res.data;
    },
  });

  return [chats, refetch];
};

export default useChat;
