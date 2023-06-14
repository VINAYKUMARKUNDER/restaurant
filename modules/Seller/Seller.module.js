
const {DataTypes} = require('sequelize');
const db = require('../../database');


const Seller = db.define( 'Seller',{

    seller_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        select: false,
        
    },
    mobile:{
        type:DataTypes.STRING,
        allowNull:false,
       unique:true
    },
   

},
{
    tableName: 'Seller',
    timestamps: true,
}
);


Seller.sync()
.then(()=>{
    console.log('Seller table created successfully..')
})
.catch((err)=>{
    console.log(err);
});


module.exports=Seller;