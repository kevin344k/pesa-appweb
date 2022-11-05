const express = require("express");

const router = express.Router();

//codigo que responde  a la solicitud de inicion de seción y carga /signin

router.get('/signin', (req, res) => {
  res.render('./auth/signin');
});



router.post('/signin',(req,res)=>{

 successRedirect:'/planeacion'

 res.render('planeacion')



})






















module.exports = router;
