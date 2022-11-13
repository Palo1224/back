const {Sequelize, Op} = require("sequelize");
const SistemaRef=require("./models/SistemaRef")
const Empresa=require("./models/Empresa")
const ClasifTema=require("./models/ClasifTema")
const Usuario=require("./models/Usuarios")
const Perfiles=require("./models/Perfiles")
const Contenido= require("./models/Contenidos")
require('dotenv').config();

const sequelize = new Sequelize(
    'knowledge-base-qwork',
    'root',
    'musiLolo2022',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );
   Contenido(sequelize)
   SistemaRef(sequelize)
   Empresa(sequelize)
   ClasifTema(sequelize)
   Perfiles(sequelize)
   Usuario(sequelize)

   const {perfile,usuario,sistRef}=sequelize.models;
 
  //  usuario.belongsTo(empresa)
// perfile.belongsToMany(usuario,{through:"perfile_id", timestamps:false, foreignKey:"id_perfile"})

// usuario.belongsToMany(perfile, {through: "perfile_usuario", timestamps:false})
// perfile.belongsToMany(usuario, {through: "perfile_usuario", timestamps:false})

// perfile.hasMany(usuario,{foreignKey:"perfile_id"})

// perfile.hasOne(usuario) 
// usuario.belongsToMany(sistRef,{through:"idSistema", timestamps:false, foreignKey:"idsistema"})
// sistRef.hasMany(usuario)
// usuario.belongsToMany(empresa,{through:"idEmpresa", timestamps:false, foreignKey:"idempresa"})
// empresa.hasMany(usuario)
// usuario.belongsToMany(clasifTema,{through:"idClasif", timestamps:false, foreignKey:"idclasif"})
// clasifTema.hasOne(usuario)
// // usuario.belongsToMany(empresa, {
// //   through: 'idEmpresa'
// // })
async function loadDb(){
 }


 module.exports = {
    ...sequelize.models,
    sequelize,
    Op,
    loadDb
  }