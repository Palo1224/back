// const {Schema, model,mongoose}=require("mongoose");

// const EmpresaSchema=Schema({
//     DescripEmpresa:{type:String,
//         unique:true},
// })


// const Empresa=mongoose.model("Empresa",EmpresaSchema)
// module.exports=Empresa;

    const { DataTypes} = require('sequelize');
    module.exports = (sequelize) => {
    sequelize.define('empresa',{

        DescripEmpresa:{ type: DataTypes.STRING,
        unique:true}},{timestamps:false})

    }

