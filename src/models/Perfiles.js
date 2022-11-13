// const {Schema, model, mongoose }=require("mongoose");

// const PerfilSchema=  Schema({

//     DescripPerfil:{type:String,
//     unique:true},
    
// })

// const Perfil=mongoose.model('Perfiles', PerfilSchema);
// module.exports =Perfil
const { DataTypes} = require('sequelize');
module.exports = (sequelize) => {
 const Perfile= sequelize.define('perfile',{
        DescripPerfil:{ type: DataTypes.STRING,
        unique:true}},{timestamps:false})


        // Perfil.associate=models=>{
        //         Perfil.belongsTo(models.User,{
        //             foreignKey:{
        //                 name:"userPerfil",
        //                 allowNull:false
        //             }  
        //         })
        // }
        return Perfile
    }

    