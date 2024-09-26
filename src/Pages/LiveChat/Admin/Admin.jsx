import React, { useEffect, useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const Admin = () => {
  const { user } = useAuth();
  const [chats, refetch] = useChat();
  const axiosPublic = useAxiosPublic();

  const [selectedChat, setSelectedChat] = useState(null);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchChatDetails = async (chatId) => {
    try {
      const response = await axiosPublic.get(`/chats/${chatId}`);
      setSelectedChat(response.data); // Update selected chat state
    } catch (error) {
      console.error("Error fetching chat details:", error.message);
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
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedChat, axiosPublic]);

  const handleNewChat = async (event) => {
    event.preventDefault();
    if (!selectedChat) return;

    const newMessage = {
      text: newText,
      name: user?.displayName,
      email: user?.email,
      time: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const chatId = selectedChat._id;

      const response = await axiosPublic.patch(`/chats/${chatId}`, {
        $push: { messages: newMessage },
      });

      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));

      setNewText("");
      //   console.log("Message sent successfully:", response.data);
    } catch (error) {
      //   console.error("Error sending message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = async () => {
    if (selectedChat) {
      const chatId = selectedChat._id;

      try {
        const response = await axiosPublic.delete(`/chats/${chatId}`);
        // console.log("Chat deleted successfully:", response.data);
        refetch();
        setSelectedChat(null);
      } catch (error) {
        // console.error("Error deleting chat:", error.message);
      }
    }
  };

  return (
    <div className="m-10">
      {!selectedChat && (
        <section className="border rounded-lg p-4 space-y-4">
          <p>Open Ticket</p>
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
                {loading ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  "End Chat"
                )}
              </button>
            </div>
          </div>
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

export default Admin;
