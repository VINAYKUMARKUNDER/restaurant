
const usersModule = require("./users.modules");
const db = require('../../database')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Product = require('../Products/products.module');

module.exports = {
  //get all entry
  getAll: async (req, res) => {
    try {
      const pageSize = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const offset = (currentPage - 1) * pageSize;
      const data = await db.query(
        `SELECT * FROM user LIMIT ${pageSize} OFFSET ${offset};`,
        (err, result) => {}
      );

      const d = data[0];
      const allData =[];
      for(let i=0;i<d.length;i++){
        const {password, ...da} = d[i];
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
     
      });
    }
  },

  //get  entry by id
  getById: async (req, res) => {
    try {
      const data = await usersModule.findByPk(req.params.id);
      const {password , ...data1} = data.dataValues;
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
        data: data1,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: 0,
        msg: `internal server error!!`,
      
      });
    }
  },

  // create new entry  or register your self
  createNewEntry: async (req, res) => {
    try {
      const rawData = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(rawData.password, salt);
      rawData.password = hash;
      rawData.created_at = new Date();
      rawData.updated_at = new Date();
      const randomStr = () => require('crypto').randomBytes(32).toString('hex');
      console.log(randomStr());
      rawData.remember_token=randomStr();
      const data = await usersModule.create(rawData);
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
        error:error,
        
      });
    }
  },

  // update by id
  updateEntry: async (req, res) => {
    try {
      const find = await usersModule.findByPk(req.params.id);
      if (!find)
        return res.status(200).json({
          status: 200,
          msg: `data found with id:${req.params.id}`,
          success: 0,
        });

      const rawData = req.body;
      rawData.updated_at = new Date();
      const updateed = await usersModule.update(rawData, {
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
      const find = await usersModule.findByPk(req.params.id);
      if (!find)
        return res.status(200).json({
          status: 200,
          msg: `data found with id:${req.params.id}`,
          success: 0,
        });

      const updateed = await usersModule.destroy( {
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


  // reset password
  password_reset: async(req, res)=>{
    try {
      
    } catch (error) {
      
    }
  }
  


};
