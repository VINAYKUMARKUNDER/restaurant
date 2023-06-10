const { Sequelize, DataTypes } = require('sequelize');

const db = require('../../database');

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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'payments',
  timestamps: true,
});

const Order = require('../orders/orders.modules');
Payment.belongsTo(Order, { foreignKey: 'order_id' });



Payment.sync()
  .then(() => {
    console.log('Payments table has been created');
  })
  .catch((error) => {
    console.error('Error creating payments table:', error);
  });

module.exports = Payment;
