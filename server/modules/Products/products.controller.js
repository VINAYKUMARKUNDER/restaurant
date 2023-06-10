const express = require('express');
const router = express.Router();
const {getAll} = require('./products.service');

router.get('/', getAll);

module.exports=router;