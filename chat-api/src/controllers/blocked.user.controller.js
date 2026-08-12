const { BlockedUser } = require("../models");

//Block user
const blockUser = async (req, res) => {
  try {
    const blockerId = req.user.user_id;
    const { blocked_id } = req.body;

    if (blockerId === blocked_id)
      return res.status(400).json({ error: "You cannot block yourself" });

    //Check if already blocked
    const existing = await BlockedUser.findOne({
      where: { blocker_id: blockerId, blocked_id: blocked_id },
    });

    if (existing)
      return res.status(400).json({ error: "User already blocked" });

    const block = await BlockedUser.create({
      blocker_id: blockerId,
      blocked_id,
    });
    res.json({ success: true, block });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Unblock user
const unblockUser = async (req, res) => {
  try {
    const blockerId = req.user.user_id;
    const { blocked_id } = req.body;

    const existing = await BlockedUser.findOne({
      where: { blocker_id: blockerId, blocked_id },
    });

    if (!existing) return res.status(400).json({ error: "User not blocked" });

    await existing.destroy();
    res.json({ success: true, message: "User unblocked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get blocked user

const getBlockStatus = async (req, res) => {
  try {
    const currentUserId = req.user.user_id; // logged-in user
    const { otherUserId } = req.params; // the user you're checking against

    // Check if YOU blocked them
    const youBlocked = await BlockedUser.findOne({
      where: { blocker_id: currentUserId, blocked_id: otherUserId },
    });

    // Check if THEY blocked you
    const theyBlocked = await BlockedUser.findOne({
      where: { blocker_id: otherUserId, blocked_id: currentUserId },
    });

    res.json({
      youBlocked: !!youBlocked,
      theyBlocked: !!theyBlocked,
    });
  } catch (error) {
    console.error("Error checking block status:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { blockUser, unblockUser, getBlockStatus };
