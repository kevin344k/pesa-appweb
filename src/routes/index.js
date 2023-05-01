const express = require("express");
const router = express.Router();
const path=require("path")


const views= path.join(__dirname, "/../views")

//main page
router.get("/", (req, res) => {
  res.render(views+"index");
});
//login
router.post("/signin", (req, res) => {
  res.send("Bienvenido");
});
//planner
router.get("/planner", (req, res) => {
  res.render(views+"planeacion");
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
