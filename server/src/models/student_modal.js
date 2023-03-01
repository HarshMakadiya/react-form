const DataTypes = require("sequelize");
const sequelize = require("./index.js");
const Students = sequelize.define("students", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address2: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  image:{
    type: DataTypes.STRING
  }
});

Students.sync().then(()=>{
  console.log("connected")
}).catch((e)=>{
  console.log(e);
});

module.exports = Students;

