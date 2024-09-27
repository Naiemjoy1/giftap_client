import React, { useEffect, useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useUsers from "../../../Components/Hooks/useUsers";
import { io } from "socket.io-client";

const User = () => {
  const { user } = useAuth();
  const [chats, refetch] = useChat();
  const axiosPublic = useAxiosPublic();

  const [newText, setNewText] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const currentUsers = chats.filter((u) => u?.email === user?.email);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket", "polling"], // Use websocket and polling
      reconnection: true, // Enable reconnection
    });
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect(); // Use disconnect instead of close for better handling
    };
  }, []);

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

    if (newText.trim() === "") return; // Prevent sending empty messages

    const newMessage = {
      text: newText,
      name: user?.displayName,
      email: user?.email,
      time: new Date().toISOString(),
    };

    setLoading(true); // Set loading state to true

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
      setLoading(false); // Set loading state to false after completion
    }
  };

  // Handle deleting the current chat
  const handleDeleteChat = async () => {
    if (currentUsers.length > 0) {
      const chatId = currentUsers[0]._id; // Get the chat ID to delete

      try {
        const response = await axiosPublic.delete(`/chats/${chatId}`);
        console.log("Chat deleted successfully:", response.data);
        refetch(); // Refresh the chat list
        setCurrentChat([]); // Clear current chat messages
      } catch (error) {
        console.error("Error deleting chat:", error.message);
      }
    }
  };

  const [users] = useUsers();

  const usersDetails = users.filter((u) => u?.email === user?.email);
  //   console.log(usersDetails);

  const isAdmin = currentUsers.length > 0 && currentUsers[0]?.type === "admin";
  const isUser = currentUsers.length > 0 && currentUsers[0]?.type === "user";

  return (
    <div className=" m-10">
      <section className="flex justify-between items-center">
        {currentChat.length === 0 && (
          <button className="btn btn-primary btn-sm" onClick={handleChat}>
            Start Chat
          </button>
        )}
        {currentChat.length > 0 && (
          <button className="btn btn-danger btn-sm" onClick={handleDeleteChat}>
            Delete Chat
          </button>
        )}
      </section>

      <section
        className="border p-4 rounded-lg my-4 overflow-y-auto h-[300px]"
        style={{ maxHeight: "300px" }} // Fixed height
      >
        {currentChat.map((message, index) => (
          <div key={index}>
            <strong>{message.name}:</strong> {message.text}
          </div>
        ))}
      </section>

      <section className="flex">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          disabled={loading} // Disable input while loading
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={handleNewChat}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            "Send"
          )}{" "}
          {/* Show loading state in button */}
        </button>
      </section>
    </div>
  );
};

export default User;
