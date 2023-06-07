const expenseCategoriesModule = require("./expenseCategories.modules");

module.exports = {
  //get all entry
  getAll: async (req, res) => {
    try {
      const data = await expenseCategoriesModule.findAll();
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
        data: data,
      });
    }
  },

  //get  entry by id
  getById: async (req, res) => {
    try {
      const data = await expenseCategoriesModule.findByPk(req.params.id);
      if(!data){
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
        data: data,
      });
    }
  },

  // create new entry
  
};
