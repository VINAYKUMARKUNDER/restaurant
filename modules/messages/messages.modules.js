const { DataTypes } = require("sequelize");
const db = require("../../database");

const messages = db.define(
  "messages",
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
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
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
    tableName: "messages",
    timestamps: false,
  }
);


messages.sync()
.then(()=>{
    console.log('messages table created successfully..')
})
.catch((err)=>{
    console.log(err);
});

module.exports=messages;
