const { BlockedUser } = require("../models");
const { Op } = require("sequelize");

const blockcheck = async (req, res, next) => {
  try {
    const sender_id = req.user.user_id;
    const { receiver_id } = req.body;

    const isBlock = await BlockedUser.findOne({
      where: {
        [Op.or]: [
          { blocker_id: receiver_id, blocked_id: sender_id },
          { blocker_id: sender_id, blocked_id: receiver_id },
        ],
      },
    });

    if (isBlock)
      return res
        .status(403)
        .json({ blocked: true, message: "Cant send message due to block" });
  } catch (error) {
    res.status(500).json(error.message);
  }

  next();
};

module.exports = blockcheck;
