import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useType from "../../../Components/Hooks/useType";

const AdminChat = ({ currentUsers }) => {
  const { user } = useAuth();
  const [userType] = useType();
  const [chats, refetch, isLoadingChats] = useChat();
  const axiosPublic = useAxiosPublic();

  const [selectedChat, setSelectedChat] = useState(null);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const chatboxRef = useRef(null);

  const fetchChatDetails = async (chatId) => {
    setLoading(true);
    try {
      const response = await axiosPublic.get(`/chats/${chatId}`);
      setSelectedChat(response.data);
    } catch (error) {
      console.error("Error fetching chat details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      const interval = setInterval(async () => {
        try {
          const response = await axiosPublic.get(`/chats/${selectedChat._id}`);
          setSelectedChat(response.data);
        } catch (error) {
          console.error("Error refetching chat details:", error.message);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [selectedChat, axiosPublic]);

  useEffect(() => {
    if (!selectedChat) {
      const interval = setInterval(refetch, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedChat, refetch]);

  const handleNewChat = async (event) => {
    event.preventDefault();
    if (!selectedChat || newText.trim() === "") return;

    setLoading(true);
    const newMessage = {
      text: newText,
      name: user?.displayName,
      email: user?.email,
      time: new Date().toISOString(),
    };

    try {
      const chatId = selectedChat._id;

      await axiosPublic.patch(`/chats/${chatId}`, {
        $push: { messages: newMessage },
      });

      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));

      setNewText("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
  };

  const handleDeleteChat = async () => {
    if (selectedChat) {
      const chatId = selectedChat._id;

      try {
        await axiosPublic.delete(`/chats/${chatId}`);
        refetch();
        setSelectedChat(null);
        setIsChatboxOpen(false);
      } catch (error) {
        console.error("Error deleting chat:", error.message);
      }
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  return (
    <div>
      {userType === "admin" && (
        <button onClick={toggleChatbox} className="relative">
          <p className="text-xl">
            <FaBell />
          </p>
          {chats.length > 0 && (
            <div className="absolute -top-1 right-0 transform translate-x-1 -translate-y-1 flex items-center justify-center text-xs">
              <p className="text-2xl text-primary">*</p>
            </div>
          )}
        </button>
      )}

      {isChatboxOpen && (
        <div
          ref={chatboxRef}
          className="absolute right-4 bottom-16 w-96 bg-white shadow-lg rounded-lg p-4 z-10"
        >
          <section className="flex justify-between mb-4">
            <h2 className="font-bold text-lg">Chat</h2>
            <button className="btn btn-primary btn-sm" onClick={toggleChatbox}>
              Close
            </button>
          </section>

          {!selectedChat && (
            <section className="border rounded-lg p-4 space-y-4">
              {isLoadingChats ? (
                <div>Loading chats...</div>
              ) : (
                chats.map((chat) => (
                  <div className="flex justify-between gap-4" key={chat._id}>
                    <h2 className="card-title">{chat.name}</h2>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => fetchChatDetails(chat._id)}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner text-primary"></span>
                      ) : (
                        "Open"
                      )}
                    </button>
                  </div>
                ))
              )}
            </section>
          )}

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
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner text-primary"></span>
                    ) : (
                      "End Chat"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedChat && (
            <section className="flex mt-4">
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
                disabled={loading || newText.trim() === ""}
              >
                {loading ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  "Send"
                )}
              </button>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminChat;
