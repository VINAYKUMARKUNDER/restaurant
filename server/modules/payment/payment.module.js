const { Sequelize, DataTypes } = require('sequelize');
const User = require('../users/users.modules');
const db = require('../../database');
// const Order = require('../orders/orders.modules');

const Payment = db.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gateway: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('success', 'pending', 'failed'),
    allowNull: false,
    defaultValue:'pending'
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'payments',
  timestamps: true,
});

Payment.belongsTo(User, {foreignKey:'user_id',allowNull:false});
// Payment.belongsTo(Order, {foreignKey: 'order_id', allowNull:false})

Payment.sync()
  .then(() => {
    console.log('Payments table has been created');
  })
  .catch((error) => {
    console.error('Error creating payments table:', error);
  });

module.exports = Payment;
