

const express = require('express');
const router = express.Router();
const {getAll,createNewEntry} = require('./Seller.Service');

router.get('/', getAll);
router.post('/', createNewEntry);


module.exports=router;