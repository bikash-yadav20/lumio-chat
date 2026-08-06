import React, { use, useContext, useEffect, useState } from "react";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { getChats as fetchChats } from "../services/client";
import { AuthContext } from "../context/authContext/authContext";

const ChatSidebar = ({ setConversationId, setReceiverId, setIsActive }) => {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const { getUsers, Users } = useContext(AuthContext);

  ///fetch all chats and last message of users
  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error.message);
      }
    };

    loadChats();
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.participants?.[0]?.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-full w-full flex-col bg-white border-r">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Messages</h2>

          <button className="rounded-full p-2 transition hover:bg-gray-100">
            <FiEdit2 size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center rounded-xl bg-gray-100 px-3">
          <FiSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between px-8">
        <div>
          <button
            onClick={() => setActiveTab("chat")}
            className={`font-bold ${activeTab === "chat" ? "text-blue-600" : "text-gray-700"}`}
          >
            Chats
          </button>
          <hr
            className={`${activeTab === "chat" ? "h-1 rounded-full bg-blue-600 border-0" : "hidden"}`}
          />
        </div>
        <div>
          <button
            onClick={() => {
              setActiveTab("global");
              getUsers();
            }}
            className={`font-bold ${activeTab === "global" ? "text-blue-600" : "text-gray-700"}`}
          >
            Global
          </button>
          <hr
            className={`${activeTab === "global" ? "h-1 rounded-full bg-blue-600 border-0" : "hidden"}`}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "chat" ? (
          filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                onClick={() => {
                  setConversationId(chat.conversation_id);
                  setReceiverId(chat.participants[0].user_id);
                  setIsActive(true);
                }}
                key={chat.conversation_id}
                className="flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 transition hover:bg-blue-50"
              >
                {/* Left */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <img
                      src={chat.participants?.[0]?.profile_picture}
                      alt={chat.participants?.[0]?.full_name || "User"}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">
                      {chat.participants?.[0]?.full_name || "Unknown User"}
                    </h3>

                    <p className="truncate text-sm text-gray-500">
                      {chat.last_message?.message || "Start a conversation"}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="ml-3 flex flex-col items-end">
                  <span className="text-xs text-gray-500">
                    {chat.last_message?.createdAt
                      ? new Date(
                          chat.last_message.createdAt,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>

                  <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    2
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="rounded-full bg-blue-100 p-6">💬</div>

              <h3 className="mt-5 text-xl font-semibold text-gray-800">
                No Chats Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Start a conversation with your friends.
              </p>

              <button className="mt-6 rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
                Explore People
              </button>
            </div>
          )
        ) : (
          //display all users
          <div className="flex-1 overflow-y-auto">
            {Users.map((user) => (
              <div
                onClick={() => {
                  setReceiverId(user.user_id);
                  setIsActive(true);
                }}
                className="flex cursor-pointer items-start justify-start border-b border-gray-100 px-4 py-3 transition hover:bg-blue-50"
              >
                <div className="flex justify-between items-center ali text-start w-full">
                  <img
                    src={user.profile_picture}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold ">{user.full_name}</p>
                    <p className="font-mono text-gray-700">@{user.user_name}</p>
                  </div>
                  <p className="font-medium text-gray-600">Tap to Chat</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
