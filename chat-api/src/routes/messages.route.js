const {
  getMessages,
  markMessagesAsSeen,
} = require("../controllers/message.controller");
const auth = require("../middleware/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/messages/:conversation_id", auth.tokenVerification, getMessages);
router.patch(
  "/messages/seen/:conversationId",
  auth.tokenVerification,
  markMessagesAsSeen,
);

module.exports = router;
