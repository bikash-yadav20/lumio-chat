const {
  Conversation,
  ConversationParticipants,
  Message,
  User,
  sequelize,
} = require("../models");

const { Op } = require("sequelize");
const { getIO } = require("../sockets/socket");

const createChatAndMessage = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    let chat;

    if (req.body.type === "private") {
      // Fetch all private conversations with participants
      let chats = await Conversation.findAll({
        where: { type: "private" },
        include: [
          {
            model: ConversationParticipants,
            as: "participants",
            attributes: ["user_id"],
          },
        ],
        transaction: t,
      });

      // Check if any conversation has exactly [sender, receiver]
      chat = chats.find((c) => {
        const ids = c.participants.map((p) => p.user_id).sort();
        const target = [req.user.user_id, req.body.receiver_id].sort();
        return (
          ids.length === 2 && JSON.stringify(ids) === JSON.stringify(target)
        );
      });

      // If not found, create new private chat
      if (!chat) {
        chat = await Conversation.create(
          {
            type: "private",
            created_by: req.user.user_id,
          },
          { transaction: t },
        );

        await ConversationParticipants.bulkCreate(
          [
            {
              conversation_id: chat.conversation_id,
              user_id: req.user.user_id,
            },
            {
              conversation_id: chat.conversation_id,
              user_id: req.body.receiver_id,
            },
          ],
          { transaction: t },
        );
      }
    }

    if (req.body.type === "group") {
      // Create new group chat
      chat = await Conversation.create(
        {
          type: "group",
          group_picture: req.body.group_picture,
          group_name: req.body.group_name,
          created_by: req.user.user_id,
        },
        { transaction: t },
      );

      // Add members
      let members = Array.isArray(req.body.members)
        ? req.body.members.map((userId) => ({
            conversation_id: chat.conversation_id,
            user_id: userId,
          }))
        : [];

      // Add creator as member
      members.push({
        conversation_id: chat.conversation_id,
        user_id: req.user.user_id,
      });

      await ConversationParticipants.bulkCreate(members, { transaction: t });
    }

    // Save the message
    let message = null;

    if (req.body.message) {
      message = await Message.create(
        {
          conversation_id: chat.conversation_id,
          sender_id: req.user.user_id,
          message_type: req.body.message_type || "text",
          message: req.body.message,
          is_seen: false,
        },
        { transaction: t },
      );
    }

    if (message) {
      const sender = await User.findByPk(req.user.user_id, {
        attributes: ["user_id", "user_name"],
      });

      // Attach user to message
      const fullMessage = { ...message.toJSON(), User: sender };

      // unseen messages count for receiver
      const unseenCount = await Message.count({
        where: {
          conversation_id: chat.conversation_id,
          is_seen: false,
          sender_id: { [Op.ne]: req.user.user_id },
        },
      });

      // Send to all other participants (receiver side)
      getIO().to(chat.conversation_id).emit("newMessage", {
        fullMessage,
        conversationId: chat.conversation_id,
        unseenCount, // receiver sees updated count
      });

      // Send only to the sender socket (so they see last message but not inflated count)
      // getIO().to(req.user.user_id).emit("newMessage", {
      //   fullMessage,
      //   conversationId: chat.conversation_id,
      //   unseenCount: 0, // sender’s own unseen count stays 0
      // });
    }
    await t.commit();
    res.json({ chat, message });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

//get conversation of all users(last message)

const getConversation = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const conversations = await Conversation.findAll({
      include: [
        {
          model: ConversationParticipants,
          as: "memperships",
          required: true,
          where: { user_id: userId },
        },
        {
          model: ConversationParticipants,
          as: "participants",
          include: [
            {
              model: User,
              attributes: ["full_name", "user_id", "profile_picture"],
            },
          ],
        },
        {
          model: Message,
          separate: true,
          limit: 1,
          order: [["created_at", "DESC"]],
        },
      ],
    });

    const response = await Promise.all(
      conversations.map(async (conv) => {
        const lastMessage = conv.Messages[0] || null;

        const otherParticipants = conv.participants
          .filter((p) => p.user_id !== userId)
          .map((p) => ({
            user_id: p.User.user_id,
            full_name: p.User.full_name,
            profile_picture: p.User.profile_picture,
          }));

        // Count unseen messages
        const unseenCount = await Message.count({
          where: {
            conversation_id: conv.conversation_id,
            is_seen: false,
            sender_id: { [Op.ne]: userId },
          },
        });

        return {
          conversation_id: conv.conversation_id,
          type: conv.type,
          group_name: conv.group_name,
          group_picture: conv.group_picture,
          participants: otherParticipants,
          last_message: lastMessage
            ? {
                message_id: lastMessage.message_id,
                message: lastMessage.message,
                created_at: lastMessage.created_at,
              }
            : null,
          unseen_count: unseenCount,
        };
      }),
    );

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get or create a new conversation
const getOrCreateConversation = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { receiverId } = req.body;
    const userId = req.user.user_id;

    //looking for an existing conversation
    const conversations = await Conversation.findAll({
      where: { type: "private" },
      include: [
        {
          model: ConversationParticipants,
          as: "participants",
          attributes: ["user_id"],
        },
      ],

      transaction: t,
    });

    if (conversations) {
      const chat = conversations.find((c) => {
        const ids = c.participants.map((p) => p.user_id).sort();
        const target = [userId, receiverId].sort();
        return JSON.stringify(ids) === JSON.stringify(target);
      });
      if (chat) {
        await t.commit();
        return res.json(chat);
      }
    }

    //if not found create a new conversation
    const newConversation = await Conversation.create(
      { type: "private", created_by: userId },
      { transaction: t },
    );

    await ConversationParticipants.bulkCreate(
      [
        { conversation_id: newConversation.conversation_id, user_id: userId },
        {
          conversation_id: newConversation.conversation_id,
          user_id: receiverId,
        },
      ],
      { transaction: t },
    );

    await t.commit();
    res.json(newConversation);
  } catch (error) {
    if (t) await t.rollback();

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChatAndMessage,
  getConversation,
  getOrCreateConversation,
};
