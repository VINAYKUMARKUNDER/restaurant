const { DataTypes } = require("sequelize");
const db = require("../../database");

const foodcategories = db.define(
  "foodcategories",
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
    tableName: "foodcategories",
    timestamps: false,
  }
);

foodcategories.sync()
.then(()=>{
    console.log('foodcategories table created successfully..')
})
.catch((err)=>{
    console.log(err);
});

module.exports=foodcategories;
