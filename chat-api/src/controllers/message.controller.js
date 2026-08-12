//get all messages for user
const { Message, User } = require("../models");
const { Op } = require("sequelize");

const getMessages = async (req, res) => {
  try {
    const { conversation_id } = req.params;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    console.log("req.query:", req.query);

    const messages = await Message.findAll({
      where: { conversation_id },
      include: [
        {
          model: User,
          attributes: [
            "user_id",
            "user_name",
            "full_name",
            "profile_picture",
            "email",
            "bio",
          ],
        },
      ],

      order: [["created_at", "DESC"]],
      limit,
      offset,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//mark messages as seen
const markMessagesAsSeen = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { conversationId } = req.params;

    await Message.update(
      { is_seen: true },
      {
        where: {
          conversation_id: conversationId,
          is_seen: false,
          sender_id: { [Op.ne]: userId },
        },
      },
    );

    res.json({ success: true, message: "Messages marked as seen" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMessages, markMessagesAsSeen };
