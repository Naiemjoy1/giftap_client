import React, { useEffect, useRef, useState } from "react";
import { PiChatsDuotone } from "react-icons/pi";
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { io } from "socket.io-client";
import useUsers from "../../../Components/Hooks/useUsers";

const UserChat = () => {
  const { user } = useAuth();
  const [chats, refetch] = useChat();
  const axiosPublic = useAxiosPublic();

  const [newText, setNewText] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const chatboxRef = useRef(null); // Create a ref for the chatbox

  const currentUsers = chats.filter((u) => u?.email === user?.email);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // Adjust the URL as needed
    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, [setSocket]);

  // Listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setCurrentChat((prevChat) => [...prevChat, message]);
      });

      socket.on("updateChat", async (chatId) => {
        const response = await axiosPublic.get(`/chats/${chatId}`);
        setCurrentChat(response.data.messages || []);
      });
    }
  }, [socket, axiosPublic]);

  // Fetch current chat details when the component mounts or currentUsers change
  useEffect(() => {
    const fetchCurrentChat = async () => {
      if (currentUsers.length > 0) {
        const chatId = currentUsers[0]._id; // Assuming the first chat is the current one
        const response = await axiosPublic.get(`/chats/${chatId}`);
        setCurrentChat(response.data.messages || []);
      }
    };
    fetchCurrentChat();
  }, [currentUsers, axiosPublic]);

  // Create chat in the database
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
      refetch(); // Refresh the chat list
      console.log("Chat started successfully:", response.data);
    } catch (error) {
      console.error("Error starting chat:", error.message);
    }
  };

  // Handle sending new chat messages
  const handleNewChat = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when sending the message

    const newMessage = {
      text: newText,
      name: user?.displayName,
      email: user?.email,
      time: new Date().toISOString(),
    };

    try {
      if (currentUsers.length > 0) {
        const chatId = currentUsers[0]._id;
        await axiosPublic.patch(`/chats/${chatId}`, {
          $push: { messages: newMessage },
        });

        // Emit the new message to the server
        socket.emit("sendMessage", { ...newMessage, chatId });

        setNewText(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setLoading(false); // Set loading to false after the message is sent
    }
  };

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
    handleChat();
  };

  const handleDeleteChat = async () => {
    if (currentUsers.length > 0) {
      const chatId = currentUsers[0]._id; // Get the chat ID to delete

      try {
        const response = await axiosPublic.delete(`/chats/${chatId}`);
        console.log("Chat deleted successfully:", response.data);
        refetch(); // Refresh the chat list
        setCurrentChat([]); // Clear current chat messages
        setIsChatboxOpen(false);
      } catch (error) {
        console.error("Error deleting chat:", error.message);
      }
    }
  };

  const [users] = useUsers();
  const usersDetails = users.filter((u) => u?.email === user?.email);
  const isAdmin = usersDetails.length > 0 && usersDetails[0]?.type === "admin";
  const isUser = usersDetails.length > 0 && usersDetails[0]?.type === "user";

  return (
    <div>
      {currentChat.length === 0 && isUser && (
        <button className="text-primary text-2xl" onClick={toggleChatbox}>
          <PiChatsDuotone />
        </button>
      )}
      {currentChat.length > 0 && isUser && (
        <button className="text-primary text-2xl">
          <PiChatsDuotone />
        </button>
      )}
      {!isUser && (
        <button className="text-primary text-2xl">
          <PiChatsDuotone />
        </button>
      )}
      {isChatboxOpen && (
        <div
          ref={chatboxRef} // Attach the ref to the chatbox div
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
              disabled={loading} // Disable input while loading
            />
            <button
              className="btn btn-primary ml-2"
              onClick={handleNewChat}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : (
                "Send"
              )}{" "}
              {/* Show loading text */}
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default UserChat;
