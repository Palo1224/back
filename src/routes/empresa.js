const { Router } = require('express');
// const axios = require('axios');
const router = Router();
const {empresa}=require("../db")

router.get('/',async(req,res)=>{
    
    try {
        let busi = await empresa.findAll({})      
         res.json(busi)
    } catch (error) {
        console.log(error)
    }
})

router.post('/',async(req,res)=>{
    const {DescripEmpresa}=req.body;

    try {
        if(DescripEmpresa)
        {

            const busi=await empresa.create({DescripEmpresa})
            res.json("Empresa creado correctamente")
        }
  
            else 
            {
                res.status(400).send("Ingrese algún valor")
            }
        
    } catch (error) {
        console.log(error);
        
    }
})

router.delete("/:id",async(req,res)=>{
        try {
            const {id}=req.params
            await empresa.destroy({ where: { id: id } })
            res.status(200).json("Se eliminó correctamente!")

        } catch (error) {
            console.log(error)

        }
})


module.exports = router;