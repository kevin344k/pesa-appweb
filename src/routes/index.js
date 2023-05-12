const express = require("express");
const pool=require("../db.js")
const router = express.Router();
const passport=require("passport")
const {isLoggedIn} = require('../lib/auth')

//main page  
router.get("/", (req, res) => {
  res.render("index");
});
//login
router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.post("/auth/signin",(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    failureFlash:true
  })(req,res,next)
console.log(req.body,"req router")
})

router.get("/profile",(req,res)=>{
  res.send("profile")
})

//planner
router.get("/planner",(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.render("auth/notAuth")
  }
, (req, res) => {
  res.render("planeacion");
});

//orden de produccion
router.get("/ordenProd",(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.render("auth/notAuth")
  }
, (req, res) => {
  res.render("orden_prod.hbs");
});
router.post("/ordenProd", (req, res) => {
   res.send("recibido");
 });
//informe de operador
router.get("/informe-Operador",(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.render("auth/notAuth")
  }
, (req, res) => {
  res.render("infor-oper.hbs");
});

//dashboard
router.get("/dash",(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.render("auth/notAuth")
  }
 ,(req, res) => {
  res.render("dashboard.hbs");
});
router.get("/admin",(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.render("auth/notAuth")
  }
,(req,res)=>{
  res.render("admin.hbs")
})

router.get("/profile",(req,res)=>{
  res.send("you profile")
})
                        
module.exports = router;
