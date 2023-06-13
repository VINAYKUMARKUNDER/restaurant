const express = require('express');
const router = express.Router();
const {getAll, createNewEntry,getproductDataByTwoDatesAndProduct_id} = require('./products.service');

router.get('/', getAll);
router.post('/', createNewEntry);
router.get('/dates/:product_id/:start/:end/', getproductDataByTwoDatesAndProduct_id);

module.exports=router;