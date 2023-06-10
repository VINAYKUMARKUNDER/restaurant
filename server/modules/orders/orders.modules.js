const {Sequelize, DataTypes } = require("sequelize");
const db = require("../../database");



const Order = db.define('Order', {
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
    type: DataTypes.STRING,
    allowNull: true,
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
 
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

const Product = require('../Products/products.module');
const user = require('../users/users.modules');
const Seller = require('../Seller/Seller.module');

user.hasMany(Order, { foreignKey: 'order_id' });
Order.belongsTo(Seller, { foreignKey: 'seller_id' });
const User_Profile = db.define('Products_Order', {}, { timestamps: false });
Order.belongsToMany(Product, { through: 'Products_Order', foreignKey:'product_id' });
Product.belongsToMany(Order, { through:'Products_Order',foreignKey: 'order_id' });



User_Profile.sync()
.then(() => {
  console.log('Orders table has been created');
})
.catch((error) => {
  console.error('Error creating orders table:', error);
});

Order.sync()
  .then(() => {
    console.log('Orders table has been created');
  })
  .catch((error) => {
    console.error('Error creating orders table:', error);
  });

module.exports = Order;