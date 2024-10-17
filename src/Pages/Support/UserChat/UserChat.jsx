import React, { useEffect, useRef, useState } from "react";
import { PiChatsDuotone } from "react-icons/pi";
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { io } from "socket.io-client";
import useUsers from "../../../Components/Hooks/useUsers";
import useType from "../../../Components/Hooks/useType";

const UserChat = () => {
  const { user } = useAuth();
  const [userType, isLoading] = useType();
  const [chats, refetch] = useChat();
  const axiosPublic = useAxiosPublic();

  const [newText, setNewText] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatboxRef = useRef(null);

  const currentUsers = chats.filter((u) => u?.email === user?.email);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
      reconnection: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        setCurrentChat((prevChat) => [...prevChat, message]);
      });

      socket.on("updateChat", async (chatId) => {
        const response = await axiosPublic.get(`/chats/${chatId}`);
        setCurrentChat(response.data.messages || []);
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("updateChat");
      };
    }
  }, [socket, axiosPublic]);

  useEffect(() => {
    const fetchCurrentChat = async () => {
      if (currentUsers.length > 0) {
        const chatId = currentUsers[0]._id;
        const response = await axiosPublic.get(`/chats/${chatId}`);
        setCurrentChat(response.data.messages || []);
      }
    };
    fetchCurrentChat();
  }, [currentUsers, axiosPublic]);

  const handleChat = async () => {
    const chatData = {
      name: user?.displayName,
      email: user?.email,
      messages: [
        {
          text: "Hi",
          name: user?.displayName,
          email: user?.email,
          time: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await axiosPublic.post("/chats", chatData);
      refetch();
      console.log("Chat started successfully:", response.data);
    } catch (error) {
      console.error("Error starting chat:", error.message);
    }
  };

  const handleNewChat = async (event) => {
    event.preventDefault();

    const newMessage = {
      text: newText,
      name: user?.displayName,
      email: user?.email,
      time: new Date().toISOString(),
    };

    setLoading(true);

    try {
      if (currentUsers.length > 0) {
        const chatId = currentUsers[0]._id;
        await axiosPublic.patch(`/chats/${chatId}`, {
          $push: { messages: newMessage },
        });

        socket.emit("sendMessage", { ...newMessage, chatId });

        setNewText("");
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
    if (!isChatboxOpen) {
      handleChat();
    }
  };

  const handleDeleteChat = async () => {
    if (currentUsers.length > 0) {
      const chatId = currentUsers[0]._id;

      try {
        const response = await axiosPublic.delete(`/chats/${chatId}`);
        console.log("Chat deleted successfully:", response.data);
        refetch();
        setCurrentChat([]);
        setIsChatboxOpen(false);
      } catch (error) {
        console.error("Error deleting chat:", error.message);
      }
    }
  };

  const [users] = useUsers();
  const usersDetails = users.filter((u) => u?.email === user?.email);
  // const isUser = usersDetails.length > 0 && usersDetails[0]?.type === "user";

  return (
    <div>
      {userType === "user" && (
        <button className="text-primary text-2xl" onClick={toggleChatbox}>
          <PiChatsDuotone />
        </button>
      )}

      {isChatboxOpen && (
        <div
          ref={chatboxRef}
          className="absolute right-4 bottom-16 w-96 bg-white shadow-lg rounded-lg p-4 z-10"
        >
          <section className="flex justify-between">
            <h2 className="font-bold text-lg">Chat</h2>
            <button className="btn btn-primary" onClick={handleDeleteChat}>
              Close
            </button>
          </section>
          <div className="h-64 overflow-y-auto border border-gray-300 rounded-md p-2">
            {currentChat.map((message, index) => (
              <div key={index}>
                <strong>{message.name}:</strong> {message.text}
              </div>
            ))}
          </div>
          <section className="flex mt-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn btn-primary ml-2"
              onClick={handleNewChat}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : (
                "Send"
              )}
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default UserChat;
