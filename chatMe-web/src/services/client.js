import api from "../services/api";

//get logged in users data
export const getMe = async () => {
  const res = await api.get("/chat-me/me");
  return res.data;
};
//get logged in users profile data
export const getLoggedUser = async () => {
  const res = await api.get("/chat-me/profile");
  return res.data;
};

export const register = async (payload) => {
  const res = await api.post("/chat-me/register", payload);
  return res.data;
};

//upload profile picture
export const uploadDp = async (file) => {
  const formData = new FormData();
  formData.append("profilePic", file);
  const res = await api.post("/chat-me/upload-dp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const login = async (payload) => {
  const res = await api.post("/chat-me/login", payload);
  return res.data;
};

//logout user
export const logoutUser = async () => {
  const res = await api.post("/chat-me/logout");
  return res.data;
};

export const getChats = async () => {
  const res = await api.get("/chat-me/chats");
  return res.data;
};

//create a new conversation
export const createConversation = async (receiverId) => {
  const res = await api.post("/chat-me/create-conversation", { receiverId });
  return res.data;
};

//send message
export const sendMessage = async (payload) => {
  const res = await api.post("/chat-me/send-message", payload);
  return res.data;
};

//create a group
export const createGroup = async (payload) => {
  const res = await api.post("/chat-me/create-group", payload);
  return res.data;
};

//get messages
export const getMessages = async (coversationId, limit, offset) => {
  const res = await api.get(`/chat-me/messages/${coversationId}`, {
    params: { limit, offset },
  });
  return res.data;
};

//get all users
export const getUsers = async () => {
  const res = await api.get("/chat-me/users");
  return res.data;
};

//fetch single user
export const fetchUserById = async (id) => {
  const res = await api.get(`/chat-me/users/${id}`);
  return res.data;
};

//block user
export const blockUser = async (id) => {
  const res = await api.post("/chat-me/block", id);
  return res.data;
};

//unblock user

export const unblockUser = async (blocked_id) => {
  const res = await api.post("/chat-me/unblock", blocked_id);
  return res.data;
};

//get block status
export const getBlockedStatus = async (otherUserId) => {
  const res = await api.get(`/chat-me/block-status/${otherUserId}`);
  return res.data;
};

//mark messages as seen
export const markMessageAsSeen = async (conversationId) => {
  const res = await api.patch(`chat-me/messages/seen/${conversationId}`);
  return res.data;
};
