const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  createNewEntry,
  updateEntry,
  deleteEntry,
  bookOrder
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
router.post('/book/:id',bookOrder )

module.exports = router;
