

const {DataTypes} = require('sequelize');
const db = require('../../database');

const Product = db.define('Product',{
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    product_price:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    offer_price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
},
{
    tableName:'Product',
    timestamps:true
});

const Seller = require('../Seller/Seller.module');
const category = require('../foodCategories/foodCategoriess.modules')
Product.belongsTo(Seller, {foreignKey:'seller_id', allowNull:false});
Product.belongsTo(category, {foreignKey:'category_id',})


Product.sync().then(()=>{console.log('product table created')}).catch((err)=>{console.log(err)});


module.exports=Product;