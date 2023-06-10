const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  createNewEntry,
  updateEntry,
  deleteEntry,
  bookOrder,
  getDataBetweenTwoDates,
  getAllOrdersBySellerId,
  getAllOrdersByUserId
} = require("./orders.service");

// get all entry
router.get("/", getAll);

// get by id
router.get("/:id/", getById);

// create new entry
router.post("/", createNewEntry);

// update entry by id
router.put('/:id', updateEntry);

// delete by id
router.delete('/:id', deleteEntry);

// book order
router.post('/book/:id',bookOrder );

// get data between two dates
router.get("/:start/:end",getDataBetweenTwoDates );


// get all data by user id
router.get('/:user_id/', getAllOrdersByUserId);

// get all data by seller id 
router.get('/:seller_id/', getAllOrdersBySellerId);

module.exports = router;
