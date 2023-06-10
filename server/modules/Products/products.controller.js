const express = require('express');
const router = express.Router();
const {getAll, createNewEntry} = require('./products.service');

router.get('/', getAll);
router.post('/', createNewEntry);

module.exports=router;