const { DataTypes } = require("sequelize");
const db = require("../../database");
const e = require("cors");

const expenses = db.define(
  "expenses",
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
    amount:{
        type: DataTypes.INTEGER,
      allowNull: false,
    },
    date:{
        type: DataTypes.STRING,
        allowNull:false
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
    tableName: "expenses",
    timestamps: false,
  }
);


expenses.sync()
.then(()=>{
    console.log('expenses table created successfully..')
})
.catch((err)=>{
    console.log(err);
});

module.exports=expenses;
