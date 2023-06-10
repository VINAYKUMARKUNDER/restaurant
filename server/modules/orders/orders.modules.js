const {Sequelize, DataTypes } = require("sequelize");
const db = require("../../database");
const Product = require('../Products/products.module');
const User = require('../users/users.modules');
const Seller = require('../Seller/Seller.module');
const Payment = require('../payment/payment.module');


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



const User_Order = db.define('User_Order', {}, { timestamps: false });
Order.belongsToMany(User, { through: 'User_Order', foreignKey:'user_id' });
User.belongsToMany(Order, { through:'User_Order',foreignKey: 'order_id' });

Order.belongsTo(Payment, {foreignKey: 'payment_id', allowNull:false});
Order.belongsTo(Seller, { foreignKey: 'seller_id' });
const Order_Product = db.define('Products_Order', {}, { timestamps: false });
Order.belongsToMany(Product, { through: 'Products_Order', foreignKey:'product_id' });
Product.belongsToMany(Order, { through:'Products_Order',foreignKey: 'order_id' });

User_Order.sync()
.then(() => {
  console.log('Orders table has been created');
})
.catch((error) => {
  console.error('Error creating orders table:', error);
});

Order_Product.sync()
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