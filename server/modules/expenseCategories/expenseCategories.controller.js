const express = require("express");
const router = express.Router();
const {getAll,getById} = require('./expenseCategories.service');

// get all entry
router.get('/', getAll);

// get by id
router.get('/:id/', getById);


module.exports = router;