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
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "expenseCategories",
    timestamps: false,
  }
);

expenseCategories.sync()
.then(()=>{
    console.log('expenseCategories table created successfully..')
})
.catch((err)=>{
    console.log(err);
});

module.exports=expenseCategories;
