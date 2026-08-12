const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
  createChatAndMessage,
  getConversation,
  getOrCreateConversation,
} = require("../controllers/conversation.controller");
const blockcheck = require("../middleware/chat.block");

const router = express.Router();

router.post(
  "/send-message",
  auth.tokenVerification,
  blockcheck,
  createChatAndMessage,
);

//get all chats
router.get("/chats", auth.tokenVerification, getConversation);

//create a new conversation
router.post(
  "/create-conversation",
  auth.tokenVerification,
  getOrCreateConversation,
);

module.exports = router;
