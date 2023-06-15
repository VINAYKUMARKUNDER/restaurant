const { DataTypes } = require("sequelize");
const db = require("../../database");

const migrations = db.define(
  "migrations",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    migration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batch:{
        type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    tableName: "migrations",
    timestamps: false,
  }
);

migrations.sync()
.then(()=>{
    console.log('migrations table created successfully..')
})
.catch((err)=>{
    console.log(err);
});



module.exports=migrations;
