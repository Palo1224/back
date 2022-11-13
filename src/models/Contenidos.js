const { DataTypes} = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define("contenido",{


  tituloTema:{
    type: DataTypes.STRING,
    required: true,
    unique:true
  },
  DescripTema: {
    type: DataTypes.STRING,
   

      

  },
  SolucionTema: {
    type: DataTypes.STRING,
  },

    idPerfiles:{type: DataTypes.JSON,},
    idSistemas: { type: DataTypes.JSON,},

  idClasif: { type: DataTypes.STRING},
  PalabrasClave: {
    type:DataTypes.JSON,
  },
  author:{
    
    type: DataTypes.STRING
  
    
  },
  FileReferencia:{ type:DataTypes.JSON
     
},
  Date:{type: DataTypes.STRING
  }, 

  idEmpresas: { type: DataTypes.JSON, },

  referencia:{
    type:DataTypes.INTEGER,
    
    
  },
  url:{
    type:DataTypes.STRING,
  }

},
{
    
  timestamps:false,
})}

