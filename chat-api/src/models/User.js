const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://res.cloudinary.com/your-cloud/default-avatar.png",
    },

    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    user_name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },

    bio: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    is_online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    last_seen: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: true, underscored: true },
);

module.exports = User;
