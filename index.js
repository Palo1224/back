const { dbConnection } = require('./src/database');
const app = require('./src/server');
const port = 3001;
const {sequelize}=require("./src/db");

app.listen(port,()=>{
  sequelize.sync({force:false
    





    }).then(() => {
    console.log('Created successfully!');
    console.log(`Server is running on port ${port}`)
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
    
})

// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });