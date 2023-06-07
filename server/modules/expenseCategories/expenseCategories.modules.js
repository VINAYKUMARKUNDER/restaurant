const { DataTypes } = require("sequelize");
const db = require("../../database");

const expenseCategories = db.define(
  "expensecategories",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "expenseCategories",
    timestamps: false,
  }
);

module.exports=expenseCategories;
