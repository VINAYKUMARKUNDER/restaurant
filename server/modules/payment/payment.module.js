const { Sequelize, DataTypes } = require('sequelize');
const User = require('../users/users.modules');
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
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['success', 'pending', 'failed']
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

Payment.sync()
  .then(() => {
    console.log('Payments table has been created');
  })
  .catch((error) => {
    console.error('Error creating payments table:', error);
  });

module.exports = Payment;
