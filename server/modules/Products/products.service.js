

const productModule = require('./products.module');
const db = require('../../database');

module.exports={
     // get all entry
     getAll: async (req, res)=>{
        try {
            const pageSize = parseInt(req.query.limit) || 10;
            const currentPage = parseInt(req.query.page) || 1;
            const offset = (currentPage - 1) * pageSize;
            const data = await db.query(
              `SELECT * FROM product LIMIT ${pageSize} OFFSET ${offset};`,
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


    //add new entry
    createNewEntry: async (req, res) => {
        try {
          const rawData = req.body;
          rawData.created_at = new Date();
          rawData.updated_at = new Date();
          console.log(rawData)
          const data = await productModule.create(rawData);
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
            error:error,
            
          });
        }
      },
}