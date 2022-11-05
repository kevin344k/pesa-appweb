const { Router } = require('express')
const express=require('express')

const router=express.Router()


// cuando recien se carga la pagina va ha soliciatr una ruta, que será la ruta raíz y el código de abajo permite responder con la renderizacion de la página principal

router.get('/',(req,res)=>{
   res.render("index")
})

// Cuando s ed eclic en submit se en el formulario de planeación el código de abajo va a renderizar en respuesta a esa solicitud, la página orden de propducción 
router.get('/ordenProd',(req,res)=>{
   res.render("orden_prod.hbs")
})

router.get('/informe-Operador',(req,res)=>{

  
  
   res.render('infor-oper.hbs')
  
  
  
  })


// este código permite exportar el módulo router al archivo autentication.js
module.exports=router