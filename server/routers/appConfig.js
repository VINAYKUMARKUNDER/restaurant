const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const expenseCategories = require('../modules/expenseCategories/expenseCategories.controller')
const expenses = require('../modules/expenses/expenses.controller')
const foodCategories = require('../modules/foodCategories/foodCategories.controller')


app.use('/api/v1/expenseCategories', expenseCategories);
app.use('/api/v1/expenses', expenses);
app.use('/api/v1/foodcategories', foodCategories);




module.exports=app;