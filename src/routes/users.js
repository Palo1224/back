const { Router } = require("express");
const {usuario} = require("../db");
const router = Router();
 const bcrypt =require("bcryptjs")

router.post("/", async (req, res) => {
  try {

    var value=req.body.password
    const {
      usuar,
      fullname,
      email,
      idSistemas,
      idPerfiles,
      idEmpresas,

      active,
    } = req.body;
    // Usuario.methods.encryptPassword=async (password)=>{
    //   const salt=await bcrypt.genSalt(10)
    //   return bcrypt.hash(password,salt);
    // };
    
    // userSchema.methods.encryptPassword = async (password) => {
    //   const salt = await bcrypt.genSalt(10);
    //   return bcrypt.hash(password, salt);
    // };
    // const salt = await bcrypt.genSalt(10);

    
    value = await bcrypt.hash(value, 10)


    
    // Usuario.methods.validatePassword = async function (password) {
    //   return bcrypt.compare(password, this.password);
    // };

    var alpha = new RegExp("^[a-zA-Z0-9 ]+$");
    //sin numeros
    var notnumber = new RegExp("^[a-zA-Z ]+$");

   
      if (!/^[a-zA-Z0-9_\-\.]+@+[a-zA-Z]+.com/.test(email)) {
        res.status(400).send("El mail tiene un formato inválido");
      } else if (!notnumber.test(fullname)) {
        res
          .status(400)
          .send("El nombre o el apellido un tiene formato inválido o un número");
      } else if  (!alpha.test(usuar)) {
        res.status(400).send("El código de usuario tiene un formato inválido");}
      
       else {
     
         
            const U = await usuario.create({
              usuar,
              fullname,
              email,
              password:value,
              active,
              idSistemas,
              idPerfiles,
              idEmpresas,
            });
            console.log(U)
 if(U)
 {
   res.status(200).json("Se creó correctamente!");

 }

   
          }
    

    

          // }

    //   // user.password = await user.encryptPassword(user.password);
  } catch (error) {
    // if (errors.keyPattern.usuario) {
    //   res.status(400).send("Ya existe un Usuario igual!");
    // } else if (errors.keyPattern.email) {
    //   res.status(400).send("Ya existe un Mail igual!");
    // } else if (
    //   errors.message.includes("Usuarios validation failed: idSistemas")
    // ) {
    //   res.status(400).send("El sistema de referencia no existe");
    // } else if (
    //   errors.message.includes("Usuarios validation failed: idPerfiles")
    // ) {
    //   res.status(400).send("El perfil no existe");
    // }
    console.log(error.parent.sqlMessage)

    if(error.parent.sqlMessage.includes("usuarios.usuar"))
    {
      res.status(400).send("Ya existe ese usuario")

    }
     if(error.parent.sqlMessage.includes("usuarios.email"))
    {
      res.status(400).send("Ya existe ese email")

    }


 

  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await usuario.findOne( {where:{ id }})
  if (user) {
    res.json(user);
  } else {
    res.status(400).send("Usuario no encontrado");
  }
});
router.get("/", async (req, res) => {
  let { search, estado, empresa } = req.query;


  try {


    let users = await usuario.findAll({})
    if (search !== undefined && estado !== undefined && empresa !== undefined) {
      if (search.length > 0) {
        users = users.filter((r) =>
          r.dataValues.fullname.toLowerCase().includes(search.toLowerCase())
        );
        if (estado.length > 0) {
          if (estado == "Activos") {
            users = users.filter((e) => e.dataValues.active == true);
          } else {
            users = users.filter((e) => e.dataValues.active == false);
          }
        }
        if (empresa.length > 0) {
          if (
            empresa == "Ningunos" ||
            empresa == "" ||
            empresa == "undefined"
          ) {
            users = users;
          } else {
            users = users.filter((e) =>
              e.dataValues.idEmpresas.find((e) => e.includes(empresa))
            );
          }
        }
      } else if (estado.length > 0) {
        if (estado == "Activos") {
          users = users.filter((e) => e.dataValues.active == true);
        } else {
          users = users.filter((e) => e.dataValues.active == false);
        }
        if (empresa == "Ningunos" || empresa == "" || empresa == "undefined") {
          users = users;
        } else {
          users = users.filter((e) =>
            e.dataValues.idEmpresas.find((e) => e.includes(empresa))
          );
        }
      } else if (empresa.length > 0) {
        if (empresa == "Ningunos" || empresa == "" || empresa == "undefined") {
          users = users;
        } else {
          users = users.filter((e) =>
            e.dataValues.idEmpresas.find((e) => e.includes(empresa))
          );
        }
      }
      res.send(users);
    } else {
      res.status(400).send("No existe un usuario!");
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { usuar, fullname, email, idPerfiles, idSistemas, idEmpresas } = req.body;


     const user=await usuario.update({fullname,usuar,email,idPerfiles,idSistemas,idEmpresas},{
      where:{id}
    })


if(user)
{  
  res.status(200).json("Se  modificó correctamente!");

}else{
  res.send("No se modificó")
}
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usuario.findOne( {where:{ id }})
    await usuario.update({active: !user.active }, {where:{id} });

    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
