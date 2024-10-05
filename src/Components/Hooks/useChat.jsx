import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useChat = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: chats = [] } = useQuery({
    queryKey: ["chats", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/chats");
      return res.data;
    },
  });

  return [chats, refetch];
};

export default useChat;
