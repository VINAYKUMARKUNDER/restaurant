

const express = require('express');
const router = express.Router();
const {getAll} = require('./Seller.Service');

router.get('/', getAll);


module.exports=router;