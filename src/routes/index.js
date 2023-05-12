const express = require("express");
const pool=require("../db.js")
const router = express.Router();
const passport=require("passport")
const {isLoggedIn,isNotLoggedIn} = require('../lib/auth')

//main page  
router.get("/", (req, res) => {
  console.log(req.body)
  res.render("index");
});
//login
router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.post("/auth/signin",isNotLoggedIn,(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    failureFlash:true
  })(req,res,next)
console.log(req.body,"req router")
})

router.get("/profile",isLoggedIn,(req,res)=>{
  res.send("profile")
})

//planner
router.get("/planner",isLoggedIn,(req,res,next)=>{
    if(req.isAuthenticated()) return next()
   res.redirect("/notAuth")
  }
, (req, res) => {
  res.render("planeacion");
});

//orden de produccion
router.get("/ordenProd",isLoggedIn,(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.redirect("/notAuth")
  }
, (req, res) => {
  res.render("orden_prod.hbs");
});
router.post("/ordenProd", (req, res) => {
   res.send("recibido");
 });
//informe de operador
router.get("/informe-Operador",isLoggedIn,(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.redirect("/notAuth")
  }
, (req, res) => {
  res.render("infor-oper.hbs");
});

//dashboard
router.get("/dash",isLoggedIn,(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.redirect("/notAuth")
  }
 ,(req, res) => {
  res.render("dashboard.hbs");
});
router.get("/admin",isLoggedIn,(req,res,next)=>{
    if(req.isAuthenticated()) return next()
  res.redirect("/notAuth")
  }
,(req,res)=>{
  res.render("admin.hbs")
})

router.get("/profile",isLoggedIn,(req,res)=>{
  res.send("you profile")
})

router.get('/notAuth',(req,res)=>{
  res.render('auth/notAuth')
})

router.get('/logOut',(req,res)=>{
  req.session.destroy((err)=>{
      res.redirect('/')
  })

})
module.exports = router;
