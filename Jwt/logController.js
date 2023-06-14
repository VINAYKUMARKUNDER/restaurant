

const express = require('express');
const router = express.Router();
const {loginUser} = require('./logService');


router.post('/login/', loginUser);


module.exports=router;