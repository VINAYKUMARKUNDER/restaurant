const PaymentModule = require("./payment.module");
const db = require("../../database");
const UserModule = require("../users/users.modules");

module.exports = {
  // get all entry
  getAll: async (req, res) => {
    try {
      const pageSize = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const offset = (currentPage - 1) * pageSize;


      const data = await db.query(
        `select * from payments LIMIT ${pageSize} offset ${offset};`,
        (err, result) => {}
      );

      return res.status(200).json({
        status: 200,
        success: 1,
        msg: `data found`,
        data: data[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
      });
    }
  },

  // get payment by user id
  getAllPaymentByUserId: async (req, res) => {
    try {
      const data = await db.query(
        `select * from payments where user_id = ${req.params.user_id};`,
        (err, result) => {}
      );
      const userData = await UserModule.findByPk(req.params.user_id);
      const { password, ...user } = userData.dataValues;
      user.payments = data[0];
      res.status(200).json({
        status: 200,
        success: 1,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
      });
    }
  },

  // get payment by date
  getAllPaymentByDate: async (req, res) => {
    try {
      const data = await db.query(
        `select * from payments where createdAt like '%${req.params.date}%';`,
        (err, result) => {}
      );

      res.status(200).json({
        status: 200,
        success: 1,
        data: data[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
      });
    }
  },

  // get payment by two dates
  getAllPaymentByTwoDates: async (req, res) => {
    try {
      const data = await db.query(
        `select * from payments where createdAt >= '${req.params.start}' and createdAt <= '${req.params.end}' ;`,
        (err, result) => {}
      );

      res.status(200).json({
        status: 200,
        success: 1,
        data: data[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
      });
    }
  },
};
