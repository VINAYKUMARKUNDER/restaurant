

const PaymentModule = require('./payment.module');

module.exports={
    // get all entry
    getAll: async (req, res)=>{
        try {
            const pageSize = parseInt(req.query.limit) || 10;
            const currentPage = parseInt(req.query.page) || 1;
            const offset = (currentPage - 1) * pageSize;
            const d= await ordersModule.findAll();
            console.log(d)
            const data = await db.query(
              `SELECT * FROM payment LIMIT ${pageSize} OFFSET ${offset};`,
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
    }
}