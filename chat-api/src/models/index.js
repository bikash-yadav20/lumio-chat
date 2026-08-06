const sequelize = require("../config/db"); // your Sequelize instance
const User = require("./User");
const Conversation = require("./Conversation");
const ConversationParticipants = require("./ConversationParticipants");
const Message = require("./Message");
const BlockedUser = require("./BlockedUser");

// Associations
User.hasMany(Message, { foreignKey: "sender_id", onDelete: "CASCADE" });
Message.belongsTo(User, { foreignKey: "sender_id" });

User.hasMany(ConversationParticipants, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
ConversationParticipants.belongsTo(User, { foreignKey: "user_id" });

Conversation.hasMany(ConversationParticipants, {
  foreignKey: "conversation_id",
  as: "participants",
  onDelete: "CASCADE",
});
Conversation.hasMany(ConversationParticipants, {
  foreignKey: "conversation_id",
  as: "memperships",
  onDelete: "CASCADE",
});
ConversationParticipants.belongsTo(Conversation, {
  foreignKey: "conversation_id",
});

Conversation.hasMany(Message, {
  foreignKey: "conversation_id",
  onDelete: "CASCADE",
});
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

Conversation.belongsTo(User, { foreignKey: "created_by", as: "creator" });

User.hasMany(BlockedUser, {
  foreignKey: "blocker_id",
  as: "blockedUsers",
});

User.hasMany(BlockedUser, {
  foreignKey: "blocked_id",
  as: "blockedBy",
});

BlockedUser.belongsTo(User, {
  foreignKey: "blocker_id",
  as: "blocker",
});

BlockedUser.belongsTo(User, {
  foreignKey: "blocked_id",
  as: "blocked",
});

// ✅ Export everything
module.exports = {
  sequelize,
  User,
  Conversation,
  ConversationParticipants,
  Message,
  BlockedUser,
};
