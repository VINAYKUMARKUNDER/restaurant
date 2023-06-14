const productModule = require("./products.module");
const db = require("../../database");
const UserModule = require('../users/users.modules');
const ordersModule = require('../orders/orders.modules');
const PaymentModule = require('../payment/payment.module');
const category = require('../foodCategories/foodCategoriess.modules');

module.exports = {
  // get all entry
  getAll: async (req, res) => {
    try {
      const pageSize = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const offset = (currentPage - 1) * pageSize;
      const data = await db.query(
        `SELECT * FROM Product LIMIT ${pageSize} OFFSET ${offset};`,
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
      console.log(rawData);
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
        error: error,
      });
    }
  },

  getproductDataByTwoDatesAndProduct_id: async (req, res) => {
    try {
      const product_id = req.params.product_id;
      const start = req.params.start;
      const end = req.params.end;
      
      const product = await productModule.findByPk(product_id, {include:category});

           if(!product){
            return res.status(200).json({
              status:200,
              success:0,
              msg:`data not found with product id: ${product_id}`
            })
           }
     const data = await db.query(`select po.order_id, po.product_id,  orders.* from products_orders po  left join orders on po.order_id=orders.order_id  
           where po.product_id= ${product_id} and createdAt between '${start}' and '${end}';`, (err, result)=>{});
    
           

           const countUsers = {};
           for (let i = 0; i < data[0].length; i++) {
             const item = data[0][i].user_id;
             countUsers[item] = (countUsers[item] || 0) + 1;
           }

           let allUser=[];

           for(let key in countUsers){
            const d = await UserModule.findByPk(key)
            const  {password, ...user} =d.dataValues ;
            const orders = await ordersModule.findAll({where:{user_id:key},include:[PaymentModule]});
            const about ={
              
              orderTiming: countUsers[key],
              user:user,
              orders:orders
            }
            
            
            allUser.push(about);

           }

           product.user=allUser
           
           res.status(200).json({
            status:200,
            success:1,
            total_num_of_orders: data[0].length,
            product:product,
            users:allUser
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
