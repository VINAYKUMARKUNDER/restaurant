
const usersModule = require('../modules/users/users.modules');
const db = require('../database');
require('dotenv').config();
const bcrypt = require('bcrypt');
const json = require('jsonwebtoken');


module.exports ={
    // login a user by email and pass
    loginUser: async (req, res)=>{
        const {email, password} = req.body;
        const user = await usersModule.findOne({where:{email:email}});
        if (!user) {
          return res.json({
            data: "Invalid email or password",
          });
        }
        else {
          const result = bcrypt.compareSync(password, user.password);
      
          if (result) {
            user.password = undefined;
            const jsontoken = json.sign(
              { result: user },
              process.env.JWT_SECRET,
              {
                expiresIn: "1h",
              }
            );
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken,
            });
          } else {
            return res.json({
              success: 0,
              data: "Invalid email or password",
            });
          }
        }
        
      }
      

}