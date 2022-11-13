const { Router } = require("express");
// const { createFields } = require("mongoose-fuzzy-searching/helpers");
const {contenido,usuario} = require("../db");
const Usuarios = require("../models/Usuarios");
const router = Router();
// const fileupload=require("express-fileupload")
router.post("/", async (req, res) => {
  try {
    const {
      tituloTema,
      DescripTema,
      SolucionTema,
      perfile,
      sistema,
      idClasif,
      author,
      FileReferencia,
      empresa,
      url
    } = req.body;
    const count = await  contenido.findAndCountAll();
    // let empresaJson={...empresa}
    // let perfilesJson={...perfile}
    // let sistemasJson={...sistema}
    let { date } = req.body;
    let meses = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let array = date.split("-");
    let array2 = array[2].split("T");
    array.pop();
    let array3 = array2[1].split(":");
    array = array.concat(array2);
    if(array3[0]==00)
    {
        array[3] = (21).toString() + ":" + array3[1];
    }
    else if(array3[0]==01)
    {
        array[3] = (22).toString() + ":" + array3[1];
        
    }else if(array3[0]==02)
    {
        array[3] = (23).toString() + ":" + array3[1];
    
    }
    else if(array3[0]==03)
    {
        array[3] = "00" + ":" + array3[1];
    
    }
    
    else 
    {
    
        array[3] = (array3[0] - 3).toString() + ":" + array3[1];
    }
    array[1] = meses[array[1] - 1];
    array = [array[2], array[1], array[0], array[3]];
    date = array.join(" ");
    
 
    if ( date && tituloTema) {

      await contenido.create({
        tituloTema: tituloTema,
        DescripTema: DescripTema,
        SolucionTema: SolucionTema,
        idPerfiles: perfile ,
        idSistemas: sistema,
        idClasif: idClasif,
        idEmpresas: empresa,
        author: author,
        url:url,
        FileReferencia,
        referencia: count.count + 1,
        Date:date
      });

      res.json("Se creo correctamenta el tema");
    }
  } catch (errors) {
    // if (errors.message.includes("contenidos validation failed: idSistemas")) {
    //   res.status(400).send("El sistema de referencia no existe");
    // } else if (
    //   errors.message.includes("contenidos validation failed: idPerfiles")
    // ) {
    //   res.status(400).send("El perfil no existe");
    // } else if (errors.code) {
    //   res.status(400).send("Ya existe el mismo tipo de problema");
    // } else {
      // }
 
      console.log(errors.errors)
    }
});
router.get("/", async (req, res) => {
  const { search, id, ref ,empresa} = req.query;

  try {
    if (id) {
      const user = await usuario.findOne({ where:{id}})

      if (user.idPerfiles == "Administrador") {
        if (!search) {
          const contenidos = await contenido.findAll({})


          let refe = contenidos.filter((e) => e.referencia == ref);
 
          if (refe && ref !== undefined) {
            res.send(refe);
          } else {
            if (empresa!==undefined) {
        
              if(empresa.toString()=="Ningunos")
              {
                res.send(contenidos);
              } else {
                let empre= contenidos.filter((e) =>
                  e.idEmpresa.find((e) => e.DescripEmpresa.includes(empresa))
                );
                if(empre.length>0)
                {
                  res.send(empre)
                }
                else 
                {
                  res.send()
                }
              }
            }
            else 
            {

              res.send(contenidos);
            }
          }
        } else {
          const contenidos = await contenidos.findAll({})

          const temasbuscados = contenidos.filter(
            (r) =>
              r.tituloTema.toLowerCase().includes(search.toLowerCase()) ||
              r.DescripTema.toLowerCase().includes(search.toLowerCase())
          );
          if (temasbuscados.length > 0) {
            res.send(temasbuscados);
          } else {
            res.status(400).send("No se encontro nada!");
          }
        }
      } else {
        if (!search) {
          const contenidos = await contenido.findAll({})

          const temas = contenidos.filter((e) =>
            e.idPerfiles.find(
              (e) =>
                e == "Invitado" ||
                e == user.idPerfiles
            )
          );
          const filtrado = [];
          temas.filter((e) =>
            e.idSistemas.forEach((element) => {
              user.idSistemas.forEach((element1) => {
                if ( element=="Todos" ||  element1 == element ) {
                  if (!filtrado.find((a) => a.id == e.id)) {
                    filtrado.push(e);
                  } else if (filtrado.length == 0) {
                    filtrado.push(e);
                  }
                }
              });
            })
          );
          let refe = filtrado.filter((e) => e.referencia == ref);
          if (refe && ref !== undefined) {
            res.send(refe);
          } else {
            if (empresa!==undefined) {
          
             if(empresa.toString()=="Ningunos")
              {
                res.send(filtrado);

              }else {
                let empre= contenidos.filter((e) =>
                  e.idEmpresa.find((e) => e.includes(empresa))
                );
                if(empre.length>0)
                {
                  res.send(empre)
                }
                else 
                {
                  res.send()
                }
              }
            }
            else 
            {

              res.send(filtrado);
            }
          }
        } else {

          const contenidos = await contenido.findAll({})

          const temas = contenidos.filter((e) =>
            e.idPerfiles.find(
              (e) =>
                e == "Invitado" ||
                e == user.idPerfiles
            )
          );
          const filtrado = [];
          temas.filter((e) =>
            e.idSistemas.forEach((element) => {
              user.idSistemas.forEach((element1) => {
                if (element=="Todos" ||  element1 == element ) {
                  if (!filtrado.find((a) => a.id == e.id)) {
                    filtrado.push(e);
                  } else if (filtrado.length == 0) {
                    filtrado.push(e);
                  }
                }
              });
            })
          );
          const temasbuscados = filtrado.filter(
            (r) =>
              r.tituloTema.toLowerCase().includes(search.toLowerCase()) ||
              r.DescripTema.toLowerCase().includes(search.toLowerCase())
          );

          if (temasbuscados.length > 0) {
            res.send(temasbuscados);
          } else {
            res.status(400).send("No se encontro nada!");
          }
        }
      }
    } else {
      if (!search) {
        const contenidos = await contenido.findAll({})

        const encontrado = contenidos.filter((e) =>
          e.idPerfiles.find((e) => e == "Invitado")
        );
        let refe = encontrado.filter((e) => e.referencia == ref);
        if (refe && ref !== undefined) {
          res.send(refe);
        }else {
          if (empresa!==undefined) {
 
           if(empresa.toString()=="Ningunos")
            {
              res.send(encontrado);

            } else {
              let empre= contenidos.filter((e) =>
                e.idEmpresa.find((e) => e.includes(empresa))
              );
              if(empre.length>0)
              {
                res.send(empre)
              }
              else 
              {
                res.send()
              }
            }
          }
          else 
          {

            res.send(encontrado);
          }
        }
      } else {
        const contenidos = await contenido.findAll({})
        
        const encontrado = contenidos.filter((e) =>
          e.idPerfiles.find((e) => e == "Invitado")
        );

        const temasbuscados = encontrado.filter(
          (r) =>
            r.tituloTema.toLowerCase().includes(search.toLowerCase()) ||
            r.DescripTema.toLowerCase().includes(search.toLowerCase())
        );
        if (temasbuscados.length > 0) {
          res.send(temasbuscados);
        } else {
          res.status(400).send("No se encontro nada!");
        }
      }
    }
  } catch (error) {
    res.status(400).send("No se encontro nada!");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const temaId = await contenido.findOne({where:{id}})


    res.json(temaId);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tituloTema,
      DescripTema,
      SolucionTema,
      idPerfiles,
      idSistemas,
      idClasif,
      author,
      FileReferencia,
      url,
      idEmpresa,
    } = req.body;

    const contenidos = await contenido.findOne({where:{id} });
    await contenido.update( {
      tituloTema,
      DescripTema,
      SolucionTema,
      idPerfiles,
      idSistemas,
      idClasif,
      author,
      FileReferencia,
      url,
      idEmpresa,
    },{where:{id}});

    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contenidos = await contenido.findOne({where:{id }});
    await contenido.destroy({where:{id}});

    res.status(200).send("Se borró correctamente!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
