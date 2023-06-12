const SellerModule = require("./Seller.module");
const db = require("../../database");
const bcrypt = require("bcrypt");

module.exports = {
  //get all entry
  getAll: async (req, res) => {
    try {
      const pageSize = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const offset = (currentPage - 1) * pageSize;

      const data = await db.query(
        `SELECT * FROM Seller LIMIT ${pageSize} OFFSET ${offset};`,
        (err, result) => {}
      );

      const d = data[0];
      const allData = [];
      for (let i = 0; i < d.length; i++) {
        const { password, ...da } = d[i];
        allData.push(da);
      }

      return res.status(200).json({
        status: 200,
        success: 1,
        msg: `data found`,
        data: allData,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
        error: error,
      });
    }
  },

  //add new entry
  createNewEntry: async (req, res) => {
    try {
      const rawData = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(rawData.password, salt);
      rawData.password = hash;
      const data = await SellerModule.create(rawData);
      return res.status(201).json({
        status: 201,
        success: 1,
        msg: `created successfully..`,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
        error: error,
      });
    }
  },
};
