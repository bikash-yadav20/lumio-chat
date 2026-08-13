import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatSection from "../components/ChatSection";
import UserDetail from "../components/UserDetail";
import Navbar from "../components/Navbar";
import { getBlockedStatus } from "../services/client";

const ChatPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverData, setReceiverData] = useState({});
  const [blockStatus, setBlockStatus] = useState({
    youBlocked: false,
    theyBlocked: false,
  });
  const [selectedConversation, setSelectedConversation] = useState({});
  console.log("conv id", conversationId);

  useEffect(() => {
    const status = async () => {
      try {
        if (!receiverId) return;
        const res = await getBlockedStatus(receiverId);
        setBlockStatus(res);
      } catch (error) {
        console.error("Failed to fetch block status:", error);
      }
    };
    status();
  }, [receiverId]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <div className="flex h-[calc(100vh-56px)] bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
          ${isActive ? "hidden md:flex" : "flex"}
          w-full md:w-80
          border-r
          bg-white
          flex-col
        `}
        >
          <ChatSidebar
            setConversationId={setConversationId}
            setReceiverId={setReceiverId}
            setIsActive={setIsActive}
            setSelectedConversation={setSelectedConversation}
          />
        </aside>

        {/* Chat Section */}
        <main
          className={`
          ${isActive ? "flex" : "hidden md:flex"}
          flex-1
          bg-white
          relative
        `}
        >
          <ChatSection
            isActive={isActive}
            setIsActive={setIsActive}
            conversationId={conversationId}
            receiverId={receiverId}
            setReceiverData={setReceiverData}
            receiverData={receiverData}
            blockStatus={blockStatus}
            selectedConversation={selectedConversation}
          />
        </main>

        {/* Profile Panel */}
        <aside
          className={`${isActive ? "hidden xl:flex w-80 border-l bg-white" : "hidden"} `}
        >
          <UserDetail
            receiverData={receiverData}
            blockStatus={blockStatus}
            setBlockStatus={setBlockStatus}
          />
        </aside>
      </div>
    </div>
  );
};

export default ChatPage;
