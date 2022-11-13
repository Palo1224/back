// const {Schema, model, mongoose}=require("mongoose");

// const ClasifTemaSchema=Schema({
//     DescripClasif:{type:String,
//         unique:true}
// })


// const ClasifTema=mongoose.model('ClasifTema',ClasifTemaSchema)
// module.exports=ClasifTema;


const { DataTypes} = require('sequelize');
const ClasifTemaSchema= (sequelize) => {
    sequelize.define('clasifTema',{
        DescripClasif:{ type: DataTypes.STRING,
        unique:true}},{timestamps:false})
    }

    
module.exports = ClasifTemaSchema
    