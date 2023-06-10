
const express = require('express');
const router = express.Router();
const {getAll} = require('./payment.service');


router.get('/', getAll);

module.exports=router;