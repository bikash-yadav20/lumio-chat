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

export const getChats = async () => {
  const res = await api.get("/chat-me/chats");
  return res.data;
};

//send message
export const sendMessage = async (payload) => {
  const res = await api.post("/chat-me/send-message", payload);
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
