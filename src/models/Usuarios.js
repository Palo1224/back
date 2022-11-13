
const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
sequelize.define("usuario",{
  usuar:{ type: DataTypes.STRING,
      unique:true,allowNull: false,
    },    fullname:{ type: DataTypes.STRING,
     
    },
    email: {  type: DataTypes.STRING, required: true, unique: true },
    password: {  type: DataTypes.STRING, required: true, select: true },
    // idPerfiles:{type:DataTypes.INTEGER,required:true},
    // idEmpresas:{ type: DataTypes.ARRAY(DataTypes.INTEGER), required: true },
    // idSistemas:{type: DataTypes.ARRAY(DataTypes.INTEGER),required: true },
    active:{type:DataTypes.BOOLEAN,required:true},
    idPerfiles:{type: DataTypes.STRING,required:true},
    idSistemas: { type: DataTypes.JSON, required: true},
    idEmpresas: { type: DataTypes.JSON, required: true}

    // idEmpresa: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //       model: Empresa,
    //       key: "idEmpresa"
    //   }
    // }
  
},{timestamps:false});

// Usuario.associate = models=> {
//   Usuario.hasOne(models.Perfiles,{
//     onDelete:"cascade"
//   })
// }
// return Usuario
}

//   Usuario.methods.encryptPassword=async (password)=>{
//     const salt=await bcrypt.genSalt(10)
//     return bcrypt.hash(password,salt);
//   }

//   // userSchema.methods.encryptPassword = async (password) => {
//   //   const salt = await bcrypt.genSalt(10);
//   //   return bcrypt.hash(password, salt);
//   // };
  
//   userSchema.methods.validatePassword = async function (password) {
//     return bcrypt.compare(password, this.password);
//   };
  // module.exports = userSchema;
