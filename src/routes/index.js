const { Router } = require('express');
const contenidos = require('./contenidos');
const perfiles=require("./perfiles");
const users=require('./users')
const sistRef=require("./sistRef")
const clasifTema=require("./clasifTema")
const empresa=require("./empresa.js")
const router = Router();

router.use(require("../controllers/auth.controllers.js"));
router.use('/perfiles', perfiles)
router.use('/users',users)
router.use('/contenidos',contenidos)
router.use('/sistRef',sistRef)
router.use("/clasifTema",clasifTema)
router.use("/empresa",empresa)

module.exports = router;