
const newadminsModule = require("./newAdmins.modules");
const db = require('../../database')


module.exports = {
  //get all entry
  getAll: async (req, res) => {
    try {
      const pageSize = parseInt(req.query.limit) || 10;
      const currentPage = parseInt(req.query.page) || 1;
      const offset = (currentPage - 1) * pageSize;
      const data = await db.query(
        `SELECT * FROM newadmins LIMIT ${pageSize} OFFSET ${offset};`,
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
      const data = await newadminsModule.findByPk(req.params.id);
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
      const data = await newadminsModule.create(rawData);
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
      const find = await newadminsModule.findByPk(req.params.id);
      if (!find)
        return res.status(200).json({
          status: 200,
          msg: `data found with id:${req.params.id}`,
          success: 0,
        });

      const rawData = req.body;
      rawData.updated_at = new Date();
      const updateed = await newadminsModule.update(rawData, {
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
      const find = await newadminsModule.findByPk(req.params.id);
      if (!find)
        return res.status(200).json({
          status: 200,
          msg: `data found with id:${req.params.id}`,
          success: 0,
        });

      const updateed = await newadminsModule.destroy( {
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
};
