const { Router } = require('express');
const { sequelize } = require('../db');
// const axios = require('axios');
const Perfiles =require("../models/Perfiles");
const router = Router();
const {perfile}=require("../db")
router.get('/',async(req,res)=>{
    
    try {
        const perfil=await perfile.findAll({})    
   

         res.json(perfil)
    } catch (error) {
        console.log(error)
    }
})

router.post('/',async(req,res)=>{
    const {DescripPerfil}=req.body;

    try {
        if(DescripPerfil)
        {

            const perfil=await perfile.create({DescripPerfil})    
            // const p=await perfile.create({DescripPerfil})    
            res.json("Perfil creado correctamemte")
          
        }
        else {
     
                res.status(400).send("Ingrese algún valor")
            
        }
    } catch (error) {
        console.log(error);
        
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params
       await perfile.destroy({ where: { id: id } })
        res.status(200).json("Se eliminó correctamente!")

    } catch (error) {
        console.log(error)

    }
})
module.exports = router;