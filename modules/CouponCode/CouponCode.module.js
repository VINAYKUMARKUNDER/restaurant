const { Sequelize,DataTypes } = require("sequelize");
const db = require("../../database");

const CouponCode = db.define(
  "CouponCode",
  {
    CouponCode_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    Code:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    validAt:{
        type: DataTypes.DATE,
        allowNull:true,
    },
    assignBy:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    discountType:{
        type: DataTypes.ENUM('per', 'inr'),
        allowNull:false
    },
    discount:{
        type: DataTypes.STRING,
        allowNull:false
    },
    offerValiedOfProductCategoryWise:{
        type: DataTypes.TEXT,
        defaultValue: 'all',
        // get() {
        //     return this.getDataValue('offerValiedOfProductCategoryWise').split(',')
        // },
        // set(val) {
        //    this.setDataValue('offerValiedOfProductCategoryWise',val.join(','));
        // },
    }
  },
  {
    tableName: "CouponCode",
    timestamps: false,
    createdAt:true
  }
);


CouponCode.sync()
.then(()=>{
    console.log('CouponCode table created successfully..')
})
.catch((err)=>{
    console.log(err);
});

module.exports=CouponCode;

