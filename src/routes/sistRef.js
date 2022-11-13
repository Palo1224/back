const { Router } = require('express');
// const axios = require('axios');
const {sistRef} =require("../db");
const router = Router();

router.get('/',async(req,res)=>{
    
    try {
        const SistemaRef=await sistRef.findAll({})
         res.json(SistemaRef)
    } catch (error) {
        console.log(error)
    }
})

router.post('/',async(req,res)=>{
    const {DescripSistema}=req.body;
   
    try {
        if(DescripSistema)
        {    await sistRef.create({DescripSistema})
        res.json("Se creo correctamente!")

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
        await sistRef.destroy({ where: { id: id } })
        res.status(200).json("Se eliminó correctamente!")

    } catch (error) {
        console.log(error)

    }
})

module.exports = router;