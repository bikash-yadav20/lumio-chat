const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Conversation = sequelize.define(
  "Conversation",
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    type: {
      type: DataTypes.ENUM("private", "group"),
      defaultValue: "private",
      allowNull: false,
    },

    group_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    group_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true },
);

module.exports = Conversation;
