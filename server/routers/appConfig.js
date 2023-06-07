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

app.use('/api/v1/expenseCategories', expenseCategoriesRoutes);
app.use('/api/v1/expenses', expensesRoutes);
app.use('/api/v1/foodcategories', foodCategoriesRoutes);
app.use('/api/v1/message', messagesRoutes);




module.exports=app;