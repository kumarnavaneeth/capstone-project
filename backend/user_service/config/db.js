const{Sequelize} = require('sequelize');
require("dotenv").config();
const sequelize =new Sequelize(
    "flight_app",
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:"mysql",
        logging:false,
    }
);
module.exports = sequelize;