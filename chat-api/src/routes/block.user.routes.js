const {
  blockUser,
  unblockUser,
} = require("../controllers/blocked.user.controller");
const auth = require("../middleware/auth.middleware");
const express = require("express");

const router = express.Router();

router.post("/block", auth.tokenVerification, blockUser);
router.post("/unblock", auth.tokenVerification, unblockUser);

module.exports = router;
