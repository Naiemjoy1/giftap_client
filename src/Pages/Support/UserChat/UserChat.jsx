import { useEffect, useRef, useState } from "react";
import { PiChatsDuotone } from "react-icons/pi";
import useAuth from "../../../Components/Hooks/useAuth";
import useChat from "../../../Components/Hooks/useChat";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { io } from "socket.io-client";
import useType from "../../../Components/Hooks/useType";
import useProducts from "../../../Components/Hooks/useProducts";
import { RxCross2 } from "react-icons/rx";

const UserChat = ({ id }) => {
  const { user } = useAuth();
  const [userType] = useType();
  const [chats, refetch] = useChat();
  const axiosPublic = useAxiosPublic();

  const [products] = useProducts();
  const currentProduct = products.find((product) => product._id === id);

  const [newText, setNewText] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatboxRef = useRef(null);

  const currentProductChat = chats.find(
    (chatProduct) =>
      chatProduct?.productId === id && chatProduct?.email === user?.email
  );

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
      if (currentProductChat) {
        const chatId = currentProductChat._id;
        const response = await axiosPublic.get(`/chats/${chatId}`);
        setCurrentChat(response.data.messages || []);
      }
    };
    fetchCurrentChat();
  }, [currentProductChat, axiosPublic]);

  const handleChat = async () => {
    const chatData = {
      name: user?.displayName,
      email: user?.email,
      productId: id,
      sellerId: currentProduct.userId,
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
      if (currentProductChat) {
        const chatId = currentProductChat._id;
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

  const toggleChat = () => {
    setIsChatboxOpen((prev) => !prev);
  };

  const toggleClose = () => {
    setIsChatboxOpen(false);
  };

  const handleDeleteChat = async () => {
    if (currentProductChat) {
      const chatId = currentProductChat._id;

      try {
        const response = await axiosPublic.delete(`/chats/${chatId}`);
        refetch();
        setCurrentChat([]);
        setIsChatboxOpen(false);
      } catch (error) {
        console.error("Error deleting chat:", error.message);
      }
    }
  };

  return (
    <div>
      {currentProductChat ? (
        <button onClick={toggleChat} className="relative">
          <p className="text-primary text-2xl">
            <PiChatsDuotone />
          </p>
          {currentProductChat && (
            <div className="absolute -top-1 right-0 transform translate-x-1 -translate-y-1 flex items-center justify-center text-xs">
              <p className="text-2xl text-primary">*</p>
            </div>
          )}
        </button>
      ) : (
        <>
          {userType === "user" && (
            <button className="text-primary text-2xl" onClick={toggleChatbox}>
              <PiChatsDuotone />
            </button>
          )}
        </>
      )}

      {isChatboxOpen && (
        <div
          ref={chatboxRef}
          className="absolute right-4 bottom-16 w-96 bg-white shadow-lg rounded-lg p-4 z-10"
        >
          <section className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">Chat</h2>
            <button
              className="btn btn-primary btn-sm text-white"
              onClick={toggleClose}
            >
              <RxCross2 />
            </button>
          </section>
          <div className="h-64 overflow-y-auto border border-gray-300 rounded-md p-2">
            {currentChat.map((message, index) => (
              <div key={index}>
                <strong>{message.name}:</strong> {message.text}
              </div>
            ))}
            <button
              className="btn btn-xs btn-error mt-3 text-white"
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
              disabled={loading || newText.trim() === ""}
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
