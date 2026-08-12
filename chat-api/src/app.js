const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userAuth = require("./routes/auth.route");
const userProfile = require("./routes/user.profile.route");
const createChatAndMsg = require("./routes/conversation.routes");
const getMessages = require("./routes/messages.route");
const blockAndUnblockUser = require("./routes/block.user.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Health status Ok");
});

//routes

//login and register-----
app.use("/chat-me", userAuth);

//get  profile, update profile, fetch users,
app.use("/chat-me", userProfile);

//create converasation
app.use("/chat-me", createChatAndMsg);

//get messages
app.use("/chat-me", getMessages);

//block and unblock
app.use("/chat-me", blockAndUnblockUser);

module.exports = app;
