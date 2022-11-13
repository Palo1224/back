
// module.exports = (sequelize) => {
//     sequelize.define('sistRef',{
//     DescripSistema:{ type: DataTypes.STRING,
//         unique:true}},{timestamps:false})
//     }
    
const { DataTypes} = require('sequelize');
const sistRefSchema= (sequelize) => {
    sequelize.define('sistRef',{
        DescripSistema:{ type: DataTypes.STRING,
        unique:true}},{timestamps:false})
    }

    module.exports = sistRefSchema
