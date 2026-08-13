import React, { useContext, useEffect, useRef, useState } from "react";
import { BsChatSquareFill } from "react-icons/bs";
import { LuVideo, LuPhone } from "react-icons/lu";
import { FiArrowLeft, FiPlus, FiSmile, FiSend } from "react-icons/fi";
import { fetchUserById, getMessages } from "../services/client";
import { AuthContext } from "../context/authContext/authContext";
import { sendMessage } from "../services/client";
import { SocketContext } from "../context/socketContext/socketContext";

const ChatSection = ({
  isActive,
  setIsActive,
  conversationId,
  receiverId,
  setReceiverData,
  receiverData,
  blockStatus,
  selectedConversation,
}) => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { currentUser, fetchCurrentUser } = useContext(AuthContext);
  const bottomRef = useRef(null);

  //check if chat is a group or private chat
  const isGroup = selectedConversation?.type === "group";
  console.log("selected conv", selectedConversation);

  const socket = useContext(SocketContext);
  // join a conversation room
  useEffect(() => {
    if (!socket) return;
    if (conversationId) {
      socket.emit("joinConversation", conversationId);
    }
  }, [conversationId]);

  // listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handler = ({
      fullMessage,
      conversationId: incomingConversationId,
    }) => {
      if (incomingConversationId === conversationId) {
        setAllMessages((prev) => {
          const exists = prev.some(
            (msg) => msg.message_id === fullMessage.message_id,
          );

          if (exists) {
            return prev;
          }

          return [fullMessage, ...prev];
        });
      }
    };

    socket.on("newMessage", handler);
    return () => socket.off("newMessage", handler);
  }, [socket, conversationId]);

  //send message handler
  const sendMessageHandler = async () => {
    try {
      if (message.length <= 0) return;
      let payload;
      if (isGroup) {
        payload = {
          type: "group",
          message_type: "text",
          message: message,
          receiver_id: conversationId,
        };
      } else {
        payload = {
          type: "private",
          message_type: "text",
          message: message,
          receiver_id: receiverId,
        };
      }
      const res = await sendMessage(payload);
      setMessage("");
    } catch (error) {
      console.error(error.message);
    }
  };

  //fetch all the messages
  useEffect(() => {
    const fetchMessages = async (conversationId, limit, offset) => {
      try {
        if (!conversationId) return;
        const data = await getMessages(conversationId, limit, offset);
        setAllMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages(conversationId, 20, 0);
    fetchCurrentUser();
  }, [conversationId]);

  //keep new messages in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  //get receiver profile info
  useEffect(() => {
    const getProfileData = async () => {
      if (!receiverId) return;
      try {
        const data = await fetchUserById(receiverId);
        setReceiverData(data);
        console.log("direct data from backend", data);
      } catch (error) {
        console.error(error);
      }
    };
    getProfileData();
  }, [receiverId]);

  return (
    <div className="flex flex-1 flex-col h-full">
      {!isActive ? (
        /* Empty Chat */
        <div className="flex flex-1 items-center justify-center bg-[#f5f7fb]">
          <div className="text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
              <BsChatSquareFill size={55} className="text-blue-600" />
            </div>

            <h1 className="mt-6 text-4xl font-bold text-gray-900">
              Welcome to Lumio Chat
            </h1>

            <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-gray-600">
              Select one of your conversations to start chatting with your
              friends and colleagues.
            </p>

            <button className="mt-8 rounded-full bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700">
              Start New Chat
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-5 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsActive(false)}
                className="rounded-full p-2 transition hover:bg-gray-100 md:hidden"
              >
                <FiArrowLeft size={20} />
              </button>

              <div className="relative">
                <img
                  src={
                    isGroup
                      ? selectedConversation.group_picture
                      : receiverData.profile_picture
                  }
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {isGroup
                    ? selectedConversation.group_name
                    : receiverData.full_name}
                </h3>

                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100">
                <LuVideo size={22} />
              </button>

              <button className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100">
                <LuPhone size={22} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 space-y-5 overflow-y-auto p-6 bg-[#eef2f7] "
            style={{
              backgroundImage:
                "radial-gradient(circle,#d6d6d6 1px,transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          >
            <div className="text-center">
              <span className="rounded-full bg-gray-300 px-4 py-1 text-xs font-medium">
                Today
              </span>
            </div>
            {[...allMessages].reverse().map((msg) => {
              const isMe = msg.sender_id === currentUser?.user_id;
              return (
                <div
                  key={msg.message_id}
                  className={`flex ${isMe ? "justify-end" : "items-end gap-2"}`}
                >
                  {!isMe && (
                    <img
                      src={msg.User.profile_picture}
                      alt="user"
                      className="h-8 w-8 rounded-full"
                    />
                  )}

                  <div>
                    <div
                      className={`max-w-sm rounded-2xl px-4 py-3 shadow-sm ${
                        isMe
                          ? "rounded-br-md bg-blue-600 text-white"
                          : "rounded-bl-md bg-white"
                      }`}
                    >
                      {msg.message}
                    </div>

                    <p
                      className={`mt-1 text-xs text-gray-500 ${
                        isMe ? "text-right" : ""
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            {blockStatus.youBlocked ? (
              <div className="flex justify-center items-center">
                <p className="text-gray-700 font-medium">blocked</p>
              </div>
            ) : (
              ""
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t bg-white p-4">
            {!blockStatus.youBlocked && !blockStatus.theyBlocked ? (
              <div className="flex items-center gap-3 rounded-full border bg-gray-50 px-4 py-2 shadow-sm">
                <button className="text-gray-500 transition hover:text-blue-600">
                  <FiPlus size={20} />
                </button>

                <button className="text-gray-500 transition hover:text-yellow-500">
                  <FiSmile size={20} />
                </button>

                <input
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none"
                />

                <button
                  onClick={sendMessageHandler}
                  className="rounded-full bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                >
                  <FiSend size={18} />
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-gray-700 font-medium">
                  You can't send message to this person
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSection;
