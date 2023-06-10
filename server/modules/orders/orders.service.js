
const ordersModule = require("./orders.modules");
const db = require('../../database')
const User = require('../users/users.modules');
const product = require('./orders.modules');
const payment = require('../payment/payment.module');
const Product = require("../Products/products.module");
const Order = require("./orders.modules");

module.exports = {
  //get all entry
  getAll: async (req, res) => {
    try {
      const pageSize = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const offset = (currentPage - 1) * pageSize;
      const d= await ordersModule.findAll();
      console.log(d)
      const data = await db.query(
        `SELECT * FROM orders LIMIT ${pageSize} OFFSET ${offset};`,
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

  //get  entry by id
  getById: async (req, res) => {
    try {
      const data = await ordersModule.findByPk(req.params.id);
      if (!data) {
        return res.status(200).json({
          status: 200,
          success: 0,
          msg: `data not found with id: ${req.params.id}`,
          data: {},
        });
      }
      return res.status(200).json({
        status: 200,
        success: 1,
        msg: `data found`,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
        
      });
    }
  },

  // create new entry
  createNewEntry: async (req, res) => {
    try {
      const rawData = req.body;
      rawData.created_at = new Date();
      rawData.updated_at = new Date();
      console.log(rawData);
      const data = await ordersModule.create(rawData);
      return res.status(201).json({
        status: 201,
        success: 1,
        msg: `created successfully..`,
        data: data.dataValues,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
       
      });
    }
  },

  // update by id
  updateEntry: async (req, res) => {
    try {
      const find = await ordersModule.findByPk(req.params.id);
      if (!find)
        return res.status(200).json({
          status: 200,
          msg: `data found with id:${req.params.id}`,
          success: 0,
        });

      const rawData = req.body;
      rawData.updated_at = new Date();
      const updateed = await ordersModule.update(rawData, {
        where: {
          id: req.params.id,
        },
      });

      if (updateed[0] == 0) {
        return res.status(200).json({
          status: 200,
          success: 0,
          msg: `something wrong`,
        });
      } else {
        return res.status(200).json({
          status: 200,
          success: 1,
          msg: `updated successfully..`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
       
      });
    }
  },


  // delete by id
  deleteEntry: async (req, res) => {
    try {
      const find = await ordersModule.findByPk(req.params.id);
      if (!find)
        return res.status(200).json({
          status: 200,
          msg: `data found with id:${req.params.id}`,
          success: 0,
        });

      const updateed = await ordersModule.destroy( {
        where: {
          id: req.params.id,
        },
      });

      if (updateed[0] == 0) {
        return res.status(200).json({
          status: 200,
          success: 0,
          msg: `something wrong`,
        });
      } else {
        return res.status(200).json({
          status: 200,
          success: 1,
          msg: `deleted successfully..`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
       
      });
    }
  },


  // book order by user
  bookOrder: async (req, res)=>{
    const user_id = req.params.id;
    const products = req.body;
    console.log({products})
    const allProducts=[];
    let total_amount = 0;

    const order={
      order_no:'aaa',
      order_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      order_type:'onl',
      order_status:false,
      user_id: user_id
    }

    const user = await User.findByPk(user_id);
    if(!user){
      return res.status(200).json({
        status: 200,
        msg: `data not found with id:${req.params.id}`,
        success: 0,
      });
    }
   
    else{
   
    
        for(let i=0;i<products.product.length;i++){
          let pro = await Product.findByPk(products.product[i]);
          if(!pro){
            return res.status(200).json({
              status: 200,
              msg: `product is not avilable with id:${products.product[i]}`,
              success: 0,
            });
          }
          else{
            total_amount+=pro.product_price;
          allProducts.push(pro)

          }
        }
        order.seller_id=allProducts[0].seller_id;
        order.total_amount=total_amount;
        const newOrder= await Order.create(order);
        return res.json(newOrder)
    }
  }

};
