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
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  coupon_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
 
  order_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

const user = require('../users/users.modules');
const Seller = require('../Seller/Seller.module');

Order.hasMany(user, { foreignKey: 'id' });
Order.belongsTo(Seller, { foreignKey: 'seller_id' });



Order.sync()
  .then(() => {
    console.log('Orders table has been created');
  })
  .catch((error) => {
    console.error('Error creating orders table:', error);
  });

module.exports = Order;