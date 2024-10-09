import useUsers from "../../Components/Hooks/useUsers";
import useAuth from "../../Components/Hooks/useAuth";
import User from "./User/User";
import Admin from "./Admin/Admin";

const LiveChat = () => {
  const { user } = useAuth();
  const [users] = useUsers();

  const currentUsers = users.filter((u) => u?.email === user?.email);

  const isAdmin = currentUsers.length > 0 && currentUsers[0]?.type === "admin";
  const isUser = currentUsers.length > 0 && currentUsers[0]?.type === "user";

  return (
    <div>
      {isUser && <User></User>} {isAdmin && <Admin></Admin>}{" "}
    </div>
  );
};

export default LiveChat;
