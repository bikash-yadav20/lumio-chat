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

module.exports = { blockUser, unblockUser };
