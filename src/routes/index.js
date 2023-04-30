const express = require("express");
const router = express.Router();
//main page
router.get("/", (req, res) => {
  res.render("index");
});
//login
router.post("/signin", (req, res) => {
  res.send("Bienvenido");
});
//planner
router.get("/planner", async (req, res) => {
  res.render("planeacion");
});/*
router.post("/planner", async (req, res) => {
   res.send("recibido");
 });*/
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
// router.post("/informe-Operador", (req, res) => {
//    res.send("recibido");
//  });
//dashboard
router.get("/dash", (req, res) => {
  res.render("dashboard.hbs");
});
router.get("/admin",(req,res)=>{
  res.render("admin.hbs")
})


module.exports = router;
