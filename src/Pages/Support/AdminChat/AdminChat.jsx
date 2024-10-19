import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { io } from "socket.io-client"; // Import socket.io-client
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useType from "../../../Components/Hooks/useType";
import useUsers from "../../../Components/Hooks/useUsers";
import useProducts from "../../../Components/Hooks/useProducts";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const AdminChat = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const currentUser = users?.find((u) => u.email === user.email);
  const [userType] = useType();
  const [chats, refetch, isLoadingChats] = useChat();
  const currentSellerChat = chats?.filter(
    (chat) => chat?.sellerId === currentUser?._id
  );
  const [products] = useProducts();
  const axiosPublic = useAxiosPublic();

  const [selectedChat, setSelectedChat] = useState(null);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const chatboxRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      // console.log("Connected to WebSocket server");
    });

    newSocket.on("connect_error", (err) => {
      // console.error("Connection error:", err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chatEnded", (data) => {
        const { chatId } = data;

        if (selectedChat?._id === chatId) {
          setSelectedChat(null);
          setIsChatboxOpen(false);
          refetch();
        }
      });

      return () => {
        socket.off("chatEnded");
      };
    }
  }, [socket, selectedChat, refetch]);

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
      name: "Seller",
      email: user?.email,
      time: new Date().toISOString(),
    };

    try {
      const chatId = selectedChat._id;
      await axiosPublic.patch(`/chats/${chatId}`, {
        $push: { messages: newMessage },
      });
      refetch();
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
    setIsChatboxOpen((prev) => {
      if (prev) {
        setSelectedChat(null);
      }
      return !prev;
    });
  };

  const handleDeleteChat = async () => {
    if (selectedChat) {
      const chatId = selectedChat._id;
      try {
        await axiosPublic.delete(`/chats/${chatId}`);
        socket.emit("chatEnded", { chatId });
        refetch();
        setSelectedChat(null);
        setIsChatboxOpen(false);
      } catch (error) {
        console.error("Error deleting chat:", error.message);
      }
    }
  };

  const currentProduct = products?.find(
    (product) => product?._id === selectedChat?.productId
  );

  useEffect(() => {
    if (selectedChat && messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  return (
    <div>
      {userType === "seller" && (
        <button onClick={toggleChatbox} className="relative">
          <p className="text-xl">
            <FaBell />
          </p>
          {currentSellerChat.length > 0 && (
            <div className="absolute -top-1 right-0 transform translate-x-1 -translate-y-1 flex items-center justify-center text-xs">
              <p className="lg:text-2xl text-lg text-primary">*</p>
            </div>
          )}
        </button>
      )}

      {isChatboxOpen && (
        <div
          ref={chatboxRef}
          className="fixed right-4 bottom-4 w-96 bg-white shadow-lg rounded-lg p-4 z-50"
        >
          <section className="flex justify-between mb-4">
            <h2 className="font-bold text-lg">Chat</h2>
            <button
              className="btn btn-primary btn-sm text-white"
              onClick={toggleChatbox}
            >
              <RxCross2 />
            </button>
          </section>

          {!selectedChat && (
            <section className="border rounded-lg p-4 space-y-4">
              {isLoadingChats ? (
                <div className="flex items-center justify-center h-screen">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : (
                currentSellerChat.map((chat) => {
                  const product = products.find(
                    (p) => p._id === chat.productId
                  ); // Find the product
                  return (
                    <div
                      className="flex justify-between items-center gap-4"
                      key={chat._id}
                    >
                      <h2 className="flex flex-col">
                        <span>{chat.name}</span>{" "}
                        <span className="text-xs">
                          {product && ` ${product.sku}`}
                        </span>
                      </h2>
                      <button
                        className="btn btn-primary btn-sm text-white"
                        onClick={() => fetchChatDetails(chat._id)}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="loading loading-spinner text-primary"></span>
                        ) : (
                          <IoIosArrowForward />
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </section>
          )}

          {selectedChat && (
            <div className=" ">
              <div
                className="h-80 overflow-y-auto border border-gray-300 rounded-md p-2"
                ref={messagesEndRef}
              >
                <div className="chat-details">
                  <h2 className="text-lg">Chat with {selectedChat.name}</h2>
                  <p>Product: {currentProduct && currentProduct.sku}</p>
                  <button
                    className="btn btn-xs btn-error text-white"
                    onClick={handleDeleteChat}
                  >
                    End chat
                  </button>
                </div>

                <div className="messages flex flex-col gap-2 mt-4">
                  {selectedChat.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg ${
                        message.email === user?.email
                          ? "bg-primary text-white self-end"
                          : "bg-gray-200 self-start"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs">
                        {new Date(message.time).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleNewChat}
                className="mt-4 flex items-center gap-2"
              >
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Type a message"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="btn btn-primary text-white"
                  disabled={loading || newText.trim() === ""}
                >
                  {loading ? (
                    <span className="loading loading-spinner text-primary"></span>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminChat;
