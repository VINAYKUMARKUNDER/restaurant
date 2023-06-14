
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'restaurant';
const DB_PASSWORD=  process.env.DB_PASSWORD || 'Vinay@1313';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USERNAME =     process.env.DB_USERNAME || 'root';

const conn = new Sequelize(
  DB_NAME,
  DB_USERNAME,
   DB_PASSWORD,
    {
      host: DB_HOST ,
      dialect: "mysql",
    }
  );


  module.exports = conn;