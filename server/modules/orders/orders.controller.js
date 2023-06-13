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
  getAllOrdersByUserId,
getAllProductByUserId,
getAllActiveUser,
getUsersByProductId,
getDatabyDate,
getOrderDataByPaymentId,
getAllSucceedOrder,
getAllFailedOrder,
createPayment
} = require("./orders.service");


// payment
router.post('/payment/:order_id/', createPayment);

// get all succed order
router.get('/failed/', getAllFailedOrder);

// get all succed order
router.get('/success/', getAllSucceedOrder);
// get Order by paymnt id
router.get('/payment/:payment_id', getOrderDataByPaymentId);

// get all orders by one date
router.get('/date/:date', getDatabyDate);


// get all user by product id
router.get('/product/:product_id',getUsersByProductId);

// get all active user
router.get('/active/user/:limit', getAllActiveUser);

// get all products by user id
router.get('/products/:id/', getAllProductByUserId);

// get all entry
router.get("/", getAll);

// get all data by user id
router.get('/user/:user_id/', getAllOrdersByUserId);
// get all data by seller id 
router.get('/seller/:seller_id/', getAllOrdersBySellerId);

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











module.exports = router;
