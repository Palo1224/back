const { Router } = require('express');
// const axios = require('axios');
const {clasifTema} =require("../db");
const router = Router();

router.get('/',async(req,res)=>{
    
    try {
        let clasiftema = await clasifTema.findAll({})      
         res.json(clasiftema)
    } catch (error) {
        console.log(error)
    }
})

router.post('/',async(req,res)=>{
    const {DescripClasif}=req.body
    try {
        if(DescripClasif)
        {
            await clasifTema.create({DescripClasif})
            
            res.json("Clasificación creado correctamente")
        }
        else 
        {
            res.status(400).send("Ingrese algún valor")
        }
    } catch (error) {
        // console.log(error.errors[0].validatorKey)
        // if(error.sqlState)
        // {

        // }
        console.log(error)
    }
})


router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params
        // const clasifTema=await ClasifTema.findAll({ where:{id: _id}})
        await clasifTema.destroy({ where: { id: id } })
        res.status(200).json("Se eliminó correctamente!")

    } catch (error) {
        console.log(error)

    }
})

module.exports=router