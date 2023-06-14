const { DataTypes } = require("sequelize");
const db = require("../../database");

const menus = db.define(
  "menus",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    foodname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fooddetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foodcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodimage: {
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
    tableName: "menus",
    timestamps: false,
  }
);


menus.sync()
.then(()=>{
    console.log('menus table created successfully..')
})
.catch((err)=>{
    console.log(err);
});

module.exports = menus;
