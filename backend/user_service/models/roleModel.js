const{DataTypes}=require("sequelize");
const squelize=require("../config/db");
const Role=squelize.define("Role",{
    role_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    role_name:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true,
    },
},{timestamps:false});
module.exports=Role;