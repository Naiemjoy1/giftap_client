import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const AdminChat = ({ currentUsers }) => {
  const { user } = useAuth();
  const [chats, refetch] = useChat(); // refetch to refresh the chat list
  const axiosPublic = useAxiosPublic();

  const [selectedChat, setSelectedChat] = useState(null); // For storing the selected chat
  const [newText, setNewText] = useState(""); // For storing new message text

  // Fetch selected chat details (used when clicking "Open")
  const fetchChatDetails = async (chatId) => {
    try {
      const response = await axiosPublic.get(`/chats/${chatId}`);
      setSelectedChat(response.data); // Update selected chat state
    } catch (error) {
      console.error("Error fetching chat details:", error.message);
    }
  };

  // Polling mechanism to refetch chat details every few seconds
  useEffect(() => {
    if (selectedChat) {
      // Poll every 5 seconds for new messages in the selected chat
      const interval = setInterval(async () => {
        try {
          const response = await axiosPublic.get(`/chats/${selectedChat._id}`);
          setSelectedChat(response.data); // Update selected chat with latest messages
        } catch (error) {
          console.error("Error refetching chat details:", error.message);
        }
      }, 1000); // Polling interval (in milliseconds)

      // Cleanup the interval when the component is unmounted or selectedChat changes
      return () => clearInterval(interval);
    }
  }, [selectedChat, axiosPublic]); // Dependency array includes selectedChat

  // Handle sending a new message
  const handleNewChat = async (event) => {
    event.preventDefault();
    if (!selectedChat) return;

    const newMessage = {
      text: newText,
      name: user?.displayName,
      email: user?.email,
      time: new Date().toISOString(),
    };

    try {
      const chatId = selectedChat._id;

      // Send new message to server
      const response = await axiosPublic.patch(`/chats/${chatId}`, {
        $push: { messages: newMessage },
      });

      // Update the selected chat state locally with the new message
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));

      setNewText(""); // Clear the input field after sending
      console.log("Message sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const chatboxRef = useRef(null);

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
  };

  const handleDeleteChat = async () => {
    if (selectedChat) {
      const chatId = selectedChat._id; // Get the selected chat ID

      try {
        const response = await axiosPublic.delete(`/chats/${chatId}`);
        console.log("Chat deleted successfully:", response.data);
        refetch(); // Refresh the chat list after deletion
        setSelectedChat(null); // Clear the selected chat
        setIsChatboxOpen(false); // Optionally close the chatbox after deletion
      } catch (error) {
        console.error("Error deleting chat:", error.message);
      }
    }
  };

  return (
    <div>
      {currentUsers?.length > 0 &&
        currentUsers[0]?.type === "admin" && ( // Check if the user is admin
          <button onClick={toggleChatbox} className="relative">
            <p className="text-xl">
              <FaBell />
            </p>
            {chats.length > 0 && ( // Conditional rendering based on chats length
              <div className="absolute -top-1 right-0 transform translate-x-1 -translate-y-1 flex items-center justify-center text-xs">
                <p className="text-2xl text-primary">*</p>
              </div>
            )}
          </button>
        )}
      {isChatboxOpen && (
        <div
          ref={chatboxRef} // Attach the ref to the chatbox div
          className="absolute right-4 bottom-16 w-96 bg-white shadow-lg rounded-lg p-4 z-10"
        >
          <section className="flex justify-between mb-4">
            <h2 className="font-bold text-lg">Chat</h2>
            <button className="btn btn-primary btn-sm" onClick={toggleChatbox}>
              Close
            </button>
          </section>

          {/* Conditionally render the chat head if no chat is selected */}
          {!selectedChat && (
            <section className="border rounded-lg p-4 space-y-4">
              {chats.map((chat) => (
                <div className="flex justify-between gap-4" key={chat._id}>
                  <h2 className="card-title">{chat.name}</h2>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => fetchChatDetails(chat._id)}
                  >
                    Open
                  </button>
                </div>
              ))}
            </section>
          )}

          {/* Selected Chat Details */}
          {selectedChat && (
            <div className="h-64 overflow-y-auto border border-gray-300 rounded-md p-2">
              <div className="chat-details">
                <h2 className="text-xl">Chat with {selectedChat.name}</h2>
                <div className="chat-messages mt-4">
                  {selectedChat.messages.map((message, index) => (
                    <div key={index} className="flex space-x-4">
                      <p className="font-semibold">{message.name} :</p>
                      <p>{message.text}</p>
                    </div>
                  ))}
                  <button
                    className="btn btn-xs btn-error mt-5"
                    onClick={handleDeleteChat}
                  >
                    End Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input for new messages */}
          <section className="flex mt-4">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button className="btn btn-primary ml-2" onClick={handleNewChat}>
              Send
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminChat;
