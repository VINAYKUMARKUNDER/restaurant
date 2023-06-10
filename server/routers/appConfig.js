const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const expenseCategoriesRoutes = require('../modules/expenseCategories/expenseCategories.controller')
const expensesRoutes = require('../modules/expenses/expenses.controller');
const foodCategoriesRoutes = require('../modules/foodCategories/foodCategories.controller');
const messagesRoutes = require('../modules/messages/messages.controller');
const menusRoutes = require('../modules/menus/menus.controller');
const migrationsRoutes = require('../modules/migrations/migrations.controller');
const newAdminsRoutes = require('../modules/newAdmins/newAdmins.controller');
const ordersRoutes = require('../modules/orders/orders.controller');
const password_resetsRoutes = require('../modules/password_resets/password_resets.controller');
const reservAtionsRoutes = require('../modules/reservAtions/reservAtions.controller');
const staffsRoutes = require('../modules/staffs/staffs.controller');
const usersRoutes = require('../modules/users/users.controller');
const logController = require('../Jwt/logController');
const paymentRoutes = require('../modules/payment/payment.controller');
const SellerRoutes = require('../modules/Seller/Seller.Controller');







app.use('/api/v1/expenseCategories', expenseCategoriesRoutes);
app.use('/api/v1/expenses', expensesRoutes);
app.use('/api/v1/foodcategories', foodCategoriesRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/menus', menusRoutes);
app.use('/api/v1/migrations', migrationsRoutes);
app.use('/api/v1/newadmins', newAdminsRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/passwordr', password_resetsRoutes);
app.use('/api/v1/reservactions', reservAtionsRoutes);
app.use('/api/v1/staffs', staffsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', logController);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/seller', SellerRoutes);




module.exports=app;