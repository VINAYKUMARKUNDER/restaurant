const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../database");
const Product = require("../Products/products.module");
const User = require("../users/users.modules");
const Seller = require("../Seller/Seller.module");
const Payment = require("../payment/payment.module");

const Order = db.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    order_status: {
      type: DataTypes.ENUM('success','pending','inprogress', 'failed','cancel','cancel-pending','other'),
      allowNull: true,
      defaultValue:'pending'
    },

    address_type:{
      type:DataTypes.ENUM('home','shop','office','other'),
      allowNull:true,
      defaultValue:'shop'
    },
    address:{
      type:DataTypes.STRING,
      allowNull:false
    },

    coupon_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    order_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    payment_status:{
      type: DataTypes.ENUM('success','pending','inprogress', 'failed'),
      allowNull: true,
      defaultValue:'pending'
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

const track_Product_with_User = db.define(
  "track_Product_with_User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false }
);
// User.hasMany(Order ,{as:'user_id'});
// Product.belongsToMany(User, {foreignKey: "product_id",through:'User_Product', uniqueKey:false});
// User.belongsToMany(Product, {foreignKey: "user_id",through:'User_Product', uniqueKey:false});

Order.belongsTo(Payment, { foreignKey: "payment_id", allowNull: true });
Order.belongsTo(Seller, { foreignKey: "seller_id" });
const Order_Product = db.define("Products_Order", {}, { timestamps: false });
Order.belongsTo(User, {foreignKey:'user_id', allowNull:false})
Order.belongsToMany(Product, {
  through: "Products_Order",
  foreignKey: "order_id",
});
Product.belongsToMany(Order, {
  through: "Products_Order",
  foreignKey: "product_id",
});

track_Product_with_User
  .sync()
  .then(() => {
    console.log("Orders table has been created");
  })
  .catch((error) => {
    console.error("Error creating orders table:", error);
  });

Order_Product.sync()
  .then(() => {
    console.log("Orders table has been created");
  })
  .catch((error) => {
    console.error("Error creating orders table:", error);
  });

Order.sync()
  .then(() => {
    console.log("Orders table has been created");
  })
  .catch((error) => {
    console.error("Error creating orders table:", error);
  });

module.exports = Order;
