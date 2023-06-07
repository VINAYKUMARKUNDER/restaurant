const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const expenseCategories = require('../modules/expenseCategories/expenseCategories.controller')




app.use('/api/v1/expenseCategories', expenseCategories);




module.exports=app;