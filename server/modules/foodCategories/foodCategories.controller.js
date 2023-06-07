const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  createNewEntry,
  updateEntry,
  deleteEntry,
} = require("./foodCategories.service");

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

module.exports = router;
