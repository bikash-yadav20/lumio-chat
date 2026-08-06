const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const ConversationParticipants = sequelize.define(
  "ConversationParticipants",
  {
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    underscored: true,
  },
);

module.exports = ConversationParticipants;
