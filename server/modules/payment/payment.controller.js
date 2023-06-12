const express = require("express");
const router = express.Router();
const {
  getAll,
  getAllPaymentByUserId,
  getAllPaymentByDate,
  getAllPaymentByTwoDates
} = require("./payment.service");

router.get("/", getAll);
router.get("/user/:user_id/", getAllPaymentByUserId);
router.get('/date/:date/', getAllPaymentByDate);
router.get('/dates/:start/:end/', getAllPaymentByTwoDates);

module.exports = router;
