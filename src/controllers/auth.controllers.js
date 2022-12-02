const { Router } = require("express");
const router = Router();
const {usuario} = require("../db");
const bcrypt =require("bcryptjs")

router.get("/logout", (req, res) => {
  req.logout();
});
router.post("/signin", async (req, res) => {
  const { email ,password} = req.body;

  try {

    const user = await usuario.findOne( {where:{ email }})

     
  
      
          if(!user)
          {
            res.status(400).send("Este email no existe");
            
          }else 
          {
              const value=user.dataValues?.password;
              
              const probando=await bcrypt.compare(password, value)
          
              if(probando)
              {
                res.status(200).json(user)
                 
                
              }
              else{
                if(user?.dataValues?.active==false)
                {
                  res.status(400).send("La cuenta no está activa")
        
                } else{
                  
                 res.status(400).json("Contraseña incorrecta!  ");
                 }        
      
              }
            }

        // bcrypt.compare(req.body.password, user.dataValues.password, function(err, re) {
      
        //   if (re) {
        //     // Send JWT
          
            
        //     if (user && re) {
        //       // const token = jwt.sign({ id: user._id }, config.secret);
      
        //       res.json(user);
        //     }
        //   } else {
        //     if(user?.dataValues?.active==false)
        //     {
        //       res.status(400).send("La cuenta no está activa")
    
        //     }
        //     else{

        //       return response.json({success: false, message: 'passwords do not match'});
        //     }
        //     // response is OutgoingMessage object that server response http request
        //   }
        //});
      //   const passwordValidate = await user.validatePassword(req.body.password);
      //   if(user.active==false)
      //   {
      //     res.status(400).send("La cuenta no está activa")

      //   }
      //   if (!passwordValidate) {
      //     res.status(400).send("Contraseña incorrecta");
      //   }
      //   if (user && passwordValidate) {
      //     // const token = jwt.sign({ id: user._id }, config.secret);
  
      //     res.json(user);
      //   }
      

        
  } catch (error) {
    console.log(error);
  }
});
router.post("/signin/admin", async (req, res) => {
  const { email ,password} = req.body;

  const user = await usuario.findOne( {where:{ email }})
  try {

    if(!user)
    {
      res.status(400).send("Este email no existe");
      
    }else 
    {
        const value=user.dataValues?.password;
        
        const probando=await bcrypt.compare(password, value)
    
        if(probando)
        {
          res.status(200).json(user)
           
          
        }
        else{
          if(user?.dataValues?.active==false)
          {
            res.status(400).send("La cuenta no está activa")
  
          } else{
            
           res.status(400).json("Contraseña incorrecta!  ");
           }        

        }
      }
        //   //   if(user?.dataValues?.active==false)
        //   //   {
        //   //     res.status(400).send("La cuenta no está activa")
    
        //   //   } else{
              
        //   //     res.json("Contraseña incorrecta!  ");
        //   //    }
        //   // }
        //   // else  {
        //   //   res.status(200).json(user)
            
        //   // }
      

          
        // }

       
      
    

  } catch (error) {
    console.log(error);
  }
});

router.post("/signin/redactor", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .populate({ path: "idPerfiles" })
      .populate({ path: "idSistemas" })
      .populate({ path: "idEmpresa" });
      if(!user)
      {
          res.status(400).send("Este email no existe");
        
      }else 
      {
        if (user.idPerfiles == "Redactor") {
        if(user.active==false)
        {
          res.status(400).send("La cuenta no está activa")
          
        }
        const passwordValidate = await user.validatePassword(req.body.password);
        if (!passwordValidate) {
          res.status(400).send("Contraseña incorrecta");
        }
        if (user && passwordValidate) {
          // const token = jwt.sign({ id: user._id }, config.secret);
  
          res.json(user);
        }
        }else {
          res.status(400).send("No tienes acceso!");

        }
      }

  } catch (error) {
    console.log(error);
  }
});


exports.uploadImage=function(req,res){
  var base64string= req.body.image;
  let base64Image=base64string.split(";base64,").pop()

}
module.exports = router;
