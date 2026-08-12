const {
  blockUser,
  unblockUser,
  getBlockStatus,
} = require("../controllers/blocked.user.controller");
const auth = require("../middleware/auth.middleware");
const express = require("express");

const router = express.Router();

router.post("/block", auth.tokenVerification, blockUser);
router.post("/unblock", auth.tokenVerification, unblockUser);

//get block status
router.get(
  "/block-status/:otherUserId",
  auth.tokenVerification,
  getBlockStatus,
);

module.exports = router;
