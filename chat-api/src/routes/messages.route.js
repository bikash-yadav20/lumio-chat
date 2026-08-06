const { getMessages } = require("../controllers/message.controller");
const auth = require("../middleware/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/messages/:conversation_id", auth.tokenVerification, getMessages);

module.exports = router;
