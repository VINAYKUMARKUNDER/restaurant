

const express = require('express');
const router = express.Router();
const {getAllUserByProductOrder} = require('./orders.service');


// router.get('/getall/', getAllUserByProductOrder);
// router.get("/getall/", getAllUserByProductOrder);

module.exports=router;