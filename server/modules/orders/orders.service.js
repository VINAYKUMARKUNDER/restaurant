
const ordersModule = require("./orders.modules");
const db = require('../../database')
const User = require('../users/users.modules');
const Payment = require('../payment/payment.module');
const Product = require("../Products/products.module");
const Order = require("./orders.modules");
const SellerModule = require("../Seller/Seller.module");
const geoip = require('geoip-lite');
const {getIPAddress} = require('../../routers/common');



const convertDateFormat = (rawDate) => {
  let date = new Date(rawDate);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
};



module.exports = {
  //get all entry
  getAll: async (req, res) => {
    try {
      const pageSize = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const offset = (currentPage - 1) * pageSize;
      const d= await ordersModule.findAll({include:[Product]});
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
      const data = await ordersModule.findOne({
        where: { order_id: req.params.id },
        include: [Product,Payment,SellerModule],
      });

      // console.log(data)

      const {Seller, ...d} = data.dataValues;
      const {password, ...allSeller} = Seller.dataValues;
      d.Seller=allSeller;
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
        data: d,
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

    try{
    console.log( req.params.id)
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

    const ipAddress = await getIPAddress();
    const geo = geoip.lookup(ipAddress);
    const currentLatitude = geo.ll[0];
    const currentLongitude = geo.ll[1];

   

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
            await db.query(`INSERT INTO track_Product_with_Users VALUES(DEFAULT,${user_id}, ${pro.product_id});`, (err, result)=>{});
            total_amount+=pro.product_price;
          allProducts.push(pro)

          }
        }

       
        const payment ={
          mode:'on',
          gateway: 'gp',
          status:'ok',
          latitude: currentLatitude,
          longitude: currentLongitude,
          comment: 'no comment',
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: user_id
        }
        const pay= await Payment.create(payment);
        order.Seller_id=allProducts[0].Seller_id;
        order.total_amount=total_amount;
       order.payment_id=(pay.dataValues.payment_id);
       if(pay){
        order.order_status=true;
       }
        const newOrder= await Order.create(order);
     
        await newOrder.addProduct(allProducts, { through: { selfGranted: false } });
        // await user.addProduct(allProducts, { through: { selfGranted: false } });
        
        
        return res.status(201).json(newOrder)
    }
  }catch(err){
    return res.status(500).json({
      status: 500,
      msg: "Internal sarver error!!",
      success: 0,
      err:err
    });
  }
  },


  // get data between two days
  getDataBetweenTwoDates: async (req, res)=>{

    try {
      const start = convertDateFormat(req.params.start);
      const end = convertDateFormat(req.params.end);
      const sStart = new Date(start);
      const sEnd = new Date(end);
      var currentDate = new Date();

      if (sStart > currentDate)
        return res.status(200).json("must be date is not future");

      const data = await db.query(
        `SELECT * FROM orders
      WHERE order_date >= '${start}' AND order_date <= '${end}'`,
        (err, result) => {}
      );
      if (data[0].length == 0)
        return res.status(200).json({
          status: 200,
          msg: `data not found with dates`,
          success: 0,
          data: data,
        });
      else
        res.status(200).json({
          status: 200,
          msg: `ok`,
          success: 1,
          data: data[0],
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        msg: "Internal sarver error!!",
        success: 0,
        err:error
      });
    }

    },

    // get data by date
  getDatabyDate: async (req, res)=>{

    try {
      const start = convertDateFormat(req.params.date);
      const sStart = new Date(start);
      var currentDate = new Date();

      if (sStart > currentDate)
        return res.status(200).json("must be date is not future");

      const data = await db.query(
        `SELECT * FROM orders
      WHERE order_date like '%${start}%';`,
        (err, result) => {}
      );
      if (data[0].length == 0)
        return res.status(200).json({
          status: 200,
          msg: `data not found with dates`,
          success: 0,
          data: data[0],
         
        });
      else
        res.status(200).json({
          status: 200,
          msg: `ok`,
          success: 1,
          total_counting: data[0].length,
          data: data[0],
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        msg: "Internal sarver error!!",
        success: 0,
        err:error
      });
    }

    },


    // get all orders by user id
    getAllOrdersByUserId: async (req, res)=>{
      try {  
       const data=await db.query(`select * from orders where user_id=${req.params.user_id};`, (err, result)=>{})
       if (data[0].length == 0)
       return res.status(200).json({
         status: 200,
         msg: `data not found with user id ${req.params.user_id}`,
         success: 0,
         data: data,
       });
     else
       res.status(200).json({
         status: 200,
         msg: `ok`,
         success: 1,
         data: data[0],
       });
   } catch (error) {
     return res.status(500).json({
       status: 500,
       msg: "Internal sarver error!!",
       success: 0,
     });
   }
    },


    // get all data by Seller id
    getAllOrdersBySellerId: async (req, res)=>{
      try {  
        console.log(req.params.Seller_id)
       const data= await db.query(`select * from orders where Seller_id=${req.params.Seller_id};`, (err, result)=>{})
  
       if (data[0].length == 0)
       return res.status(200).json({
         status: 200,
         msg: `data not found with Seller id ${req.params.Seller_id}`,
         success: 0,
         data: data,
       });
     else
       res.status(200).json({
         status: 200,
         msg: `ok`,
         success: 1,
         data: data[0],
       });
   } catch (error) {
     return res.status(500).json({
       status: 500,
       msg: "Internal sarver error!!",
       success: 0,
     });
   }
    },


    // list of user those product order
    getAllProductByUserId: async (req, res)=>{
      try {
            
        const data = await db.query(`SELECT * FROM track_product_with_users WHERE user_id = ${req.params.id};`, (err, result)=>{});
        const track = data[0];
        const user = await User.findByPk(req.params.id);

        const countProduct = {};
        for (let i = 0; i < data[0].length; i++) {
          const item = data[0][i].product_id;
          countProduct[item] = (countProduct[item] || 0) + 1;
        }


        let allProduct =[];

        for(let key in countProduct){
          const pro = await Product.findByPk(key);
          const aboutProduct={
            product_id:key,
            order_timing: countProduct[key],
            product:pro
          }
          allProduct.push(aboutProduct);
        }

        res.json({
          user:user,
          products:allProduct
        })
        
      } catch (error) {
        return res.status(500).json({
          status: 500,
          success: 0,
          msg: `internal server error!!`,
         
        });
      }
    },



    // get top active user
    getAllActiveUser: async (req, res)=>{
      try {
       const data= await db.query(`SELECT user_id, count(product_id) as totalProduct FROM track_product_with_users group by user_id
        order by count(product_id) desc limit ${req.params.limit};`, (err, result)=>{});

        const resData = data[0];

        const users=[];
        for(let i =0;i<resData.length;i++){
          const user = await User.findByPk(resData[i].user_id);
          const aboutUser={
            user:user,
            orderTiming:resData[i].totalProduct,
          }
          users.push(aboutUser);

        }
        res.status(200).json({
          status:200,
          success:1,
          data:users,
        })


      } catch (error) {
        return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
       error:error
      });
      }
    },

    
    // get all users by product id
    getUsersByProductId: async (req, res)=>{
      try {
        const product_id = req.params.product_id;
       const data= await db.query(`SELECT product_id,user_id, count(user_id) as total_times FROM track_product_with_users 
       where product_id = ${product_id} group by user_id`, (err, result)=>{});

       const product = await Product.findByPk(product_id);

        const resData = data[0];

        const users=[];
        for(let i =0;i<resData.length;i++){
          const user = await User.findByPk(resData[i].user_id);
          const aboutUser={
            user:user,
            orderTiming:resData[i].total_times,
          }
          users.push(aboutUser);

        }
        res.status(200).json({
          status:200,
          success:1,
          data:{
            product:product,
            users:users
          },
        })


      } catch (error) {
        return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
       error:error
      });
      }
    },



    // get order data by payment id
    getOrderDataByPaymentId: async (req, res)=>{
      try {
       const data = await ordersModule.findOne({
          where:{payment_id:req.params.payment_id},
          include:[Payment]
        });

        res.status(200).json({
          status:200,
          success:1,
          data:data
        })
        
      } catch (error) {
        return res.status(500).json({
          status: 500,
          success: 0,
          msg: `internal server error!!`,
         error:error
        });
      }
    },


    // get all succeed order
    getAllSucceedOrder: async (req, res)=>{
      try {
         const data = await ordersModule.findAll({where:{order_status:true}});
         return res.status(200).json({
          status:200,
          success:1,
          data:data
         })
      } catch (error) {
        return res.status(500).json({
          status: 500,
          success: 0,
          msg: `internal server error!!`,
         error:error
        });
      }
    },


     // get all failed order
     getAllFailedOrder: async (req, res)=>{
      try {
         const data = await ordersModule.findAll({where:{order_status:false}});
         return res.status(200).json({
          status:200,
          success:1,
          data:data
         })
      } catch (error) {
        return res.status(500).json({
          status: 500,
          success: 0,
          msg: `internal server error!!`,
         error:error
        });
      }
    }

};
