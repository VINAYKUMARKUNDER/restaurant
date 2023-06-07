const { DataTypes } = require("sequelize");
const db = require("../../database");

const password_resets = db.define(
  "password_resets",
  {
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "password_resets",
    timestamps: false,
  }
);

module.exports = password_resets;
