
const usersModule = require('../modules/users/users.modules');
const db = require('../database');


module.exports ={
    // login a user by email and pass
    loginUser: async (req, res)=>{
        const {email, password} = req.body;
        const user = await usersModule.findOne({where:{email:email}});
      console.log(user);
      res.status(200).json(user);
        
      }

}