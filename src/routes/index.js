const express = require("express");
const router = express.Router();
const pool  =require ("../db.js");

//main page
router.get("/", (req, res) => {
  res.render("index");
});
//login
router.get("/signin", (req, res) => {
  res.render("auth/signin");
});
router.post("/signin", (req, res) => {
console.log(req.body)
});
//planner
router.get("/planner", (req, res) => {
  res.render("planeacion");
});

//orden de produccion
router.get("/ordenProd", (req, res) => {
  res.render("orden_prod.hbs");
});
router.post("/ordenProd", (req, res) => {
   res.send("recibido");
 });
//informe de operador
router.get("/informe-Operador", (req, res) => {
  res.render("infor-oper.hbs");
});

//dashboard
router.get("/dash", (req, res) => {
  res.render("dashboard.hbs");
});
router.get("/admin",(req,res)=>{
  res.render("admin.hbs")
})

module.exports = router;
