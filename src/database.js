const path = require("path");
require("dotenv").config({ path: ".env" });
const dbConexion = process.env.DBCONNECTION;

// const mongoose = require("mongoose");
// const dbConnection = async () => {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
//   try {
//     await mongoose.connect(dbConexion, connectionParams);
//     console.log("Database Connected");
//   } catch (error) {
//     console.log(error);
//     console.log("DataBase  Failed");
//   }
// };

// module.exports = { dbConnection };
const mysql = require('mysql')



var conexion= mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'musiLolo2022',
});


const dbConnection=async()=>{
  conexion.connect()
}

 module.exports = { dbConnection };
