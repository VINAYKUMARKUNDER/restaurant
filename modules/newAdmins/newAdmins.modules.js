const { DataTypes } = require("sequelize");
const db = require("../../database");

const newadmins = db.define(
  "newadmins",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
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
    tableName: "newadmins",
    timestamps: false,
  }
);


newadmins.sync()
.then(()=>{
    console.log('newadmins table created successfully..')
})
.catch((err)=>{
    console.log(err);
});

module.exports = newadmins;
